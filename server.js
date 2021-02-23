/*
    Author: Jan Kubat
    Web: jankubat-it.cz
    Twitter: JanKubat8
*/

const express = require("express");
const app = express();
const path = require("path");
const fs = require('fs');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static('app'));
app.use('/public', express.static('app'));

app.post('/addHabbit', (req, res) => {
	fs.readFile('app/habbits.json', function (err, data) {
		var json = JSON.parse(data);
		json.habbits.push({
			"id": Date.now(),
			"name": htmlEscape(req.body.name),
			"date": Date.parse(req.body.date)
		});
		fs.writeFile("app/habbits.json", JSON.stringify(json), function (err) {
			if (err) throw err;
			console.log('Data added to json file!');
		});
	})

	res.sendStatus(200);
});

app.post('/deleteHabbit', (req, res) => {
	fs.readFile('app/habbits.json', function (err, data) {
		var json = JSON.parse(data);

		for (let i = 0; i < json.habbits.length; i++) {
			if (json.habbits[i].id == req.body.id) {
				json.habbits.splice(i, 1);
			}
		}

		fs.writeFile("app/habbits.json", JSON.stringify(json), function (err) {
			if (err) throw err;
			console.log('Data deleted from json file!');
		});
	})

	res.sendStatus(200);
});

app.post('/editHabbit', (req, res) => {
	fs.readFile('app/habbits.json', function (err, data) {
		var json = JSON.parse(data);

		for (let i = 0; i < json.habbits.length; i++) {
			if (json.habbits[i].id == req.body.id) {
				json.habbits[i].name = req.body.name;
			}
		}

		fs.writeFile("app/habbits.json", JSON.stringify(json), function (err) {
			if (err) throw err;
			console.log('Data edit in json file!');
		});
	})

	res.sendStatus(200);
});

app.get('/changeColor', (req, res) => {
	fs.readFile('app/settings.json', function (err, data) {
		var json = JSON.parse(data);
		if (typeof (req.query.color) != "undefined") {
			json.settings.color = req.query.color;
		}

		fs.writeFile("app/settings.json", JSON.stringify(json), function (err) {
			if (err) throw err;
			console.log('color changed');
		});
	})
	res.sendStatus(200);
});

app.listen(process.env.PORT || 3000);
console.log('Server up and running on port: ' + (process.env.PORT || 3000));

function htmlEscape(text) {
	return text.replace(/&/g, '&amp;').
	replace(/</g, '&lt;').
	replace(/"/g, '&quot;').
	replace(/'/g, '&#039;');
}