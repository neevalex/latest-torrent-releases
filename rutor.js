const express = require( 'express' )
const app     = express()

var request   = require( 'request-promise' );
const cheerio = require( 'cheerio' );
var html;

var get_html = async function (i, res) {
	var url  = "http://www.rutor.info/browse/" + i + "/0/0/0";
	var html = [];
	var data = [];

	const options = {
		method: 'GET',
		uri: url
	}

	await request( options )
		.then(
			async function (response) {
				var $ = cheerio.load( response );
				$( '.gai,.tum' ).each(
					function (i, element) {
						title      = $( this ).find( 'a:nth-child(3)' ).text();
						link       = $( this ).find( 'a:nth-child(3)' ).attr( 'href' );
						popularity = $( this ).find( 'td span.green' ).text();
						data.push(
							{
								title: title,
								link: link,
								popularity: parseInt( popularity )
							}
						);
					}
				);
				return (data);
			}
		);

	return (data);
};


app.use( express.static( 'html' ) )
app.get(
	'/api/:page',
	(req, res) => {
		//console.log(req.params.page);
		get_html( req.params.page, res ).then(
			function (result) {
				//console.log(result.length);
				res.send( result );
			}
		)
		.catch(
			function (error) {
				console.log( error );
			}
		);
	}
)

let port = process.env.PORT;
if (port == null || port == "") {
	port = 3001;
}
app.listen( port );
