const express = require('express')
const app = express()
const port = 3001

var path = require('path');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter);

var request = require('request');
const cheerio = require('cheerio');



var html = db.get('posts')
	.orderBy('popularity', 'desc').take(100)
	.value();


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
	console.log('feeds update');
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
}



updatefeeds();
setInterval(updatefeeds, 3600);

app.use(express.static('html'))
app.get('/api', (req, res) =>
{
	res.send(html);
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))