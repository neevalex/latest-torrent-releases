
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

var request = require('request');
const cheerio = require('cheerio');


var fileData = [];

db.get('posts').remove().write();

db.defaults({ posts: [], user: {}, count: 0 })
  .write()

// get_html receive callback to process result



var get_html = function(callback, i) {
    var url = "http://www.rutor.info/browse/"+i+"/0/0/0";
    var html = [];
    request.get(url,function(error, response, body){
    var $ = cheerio.load(body);
    $('.gai,.tum').each(function(i, element){
     title = $(this).find('a:nth-child(3)').text();
     link  = $(this).find('a:nth-child(3)').attr('href');
     popularity = $(this).find('td span.green').text();
     html.push([title], [link], [popularity]);

     db.get('posts').push({ title:title, link:link, popularity:Number(popularity)}).write()





    });


        return callback(html);
    });
};





for (var i = 0; i <= 6; i++) {

get_html(function (body) { console.log(body.length); }, i);


}


