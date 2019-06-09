const express = require('express')
const app = express()

var path = require('path');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter);

var request = require('request');
const cheerio = require('cheerio');



var html;


var get_html = function (callback, i)
{
	var url = "http://www.rutor.info/browse/" + i + "/0/0/0";
	var html = [];
	request.get(url, function (error, response, body)
	{
		var $ = cheerio.load(body);
		$('.gai,.tum').each(function (i, element)
		{
			title = $(this).find('a:nth-child(3)').text();
			link = $(this).find('a:nth-child(3)').attr('href');
			popularity = $(this).find('td span.green').text();
			html.push([title], [link], [popularity]);

			db.get('posts').push(
			{
				title: title,
				link: link,
				popularity: Number(popularity)
			}).write()

		});


		return callback(html);
	});
};




function updatefeeds()
{
	
	var fileData = [];
	db.get('posts').remove().write();
	db.defaults(
		{
			posts: [],
			user:
			{},
			count: 0
		})
		.write()


	for (var i = 0; i <= 6; i++)
	{

		get_html(function (body)
		{
			console.log(body.length);
		}, i);


	}

	return;
}



app.use(express.static('html'))


app.get('/api', (req, res) =>
{

    html = db.get('posts')
	.orderBy('popularity', 'desc').take(100)
	.value();

	updatefeeds(); res.send(html);
	
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3001;
}
app.listen(port);