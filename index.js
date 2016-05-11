var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
url = 'http://substack.net/images/';
var fs = require('fs');
var json = ["file permisson", "absolute url", "file type\n"];
         

function scrape_it(url){ 
  request(url, function(error, response, html){
    if(!error){
     var $ = cheerio.load(html);
     $("tr").each(function(){
       var data = $(this);
       var file_permission = data.children().first().text();
       var file_name = data.children().last().text();
       var absolute_url = `${url}${file_name}`;
       var file_type = `${path.extname(data.children().last().text())}\n`; 
       
       if(!((file_name === "LICENSE")|| (file_name === "../")))
        {   
         if (path.extname(data.children().last().text()) === "")  
          { 
            new_url = `${url}${data.children().last().text()}`;
            scrape_it(new_url);
          }  
          else
          {
           json=[file_permission,absolute_url,file_type];
           fs.appendFile("test.txt",json, function(err) {
           if(err) {
            return console.log(err);
            }
            console.log(json);
            console.log("...everything scraped...")
        }); 
          }
        }
      });

     
      }

    
  });
}

scrape_it(url);

