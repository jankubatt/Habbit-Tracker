const express = require("express");
const app = express();
const path = require("path");
const fs = require('fs');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('app'));

app.use('/public', express.static('app'));

app.post('/addHabbit', (req, res) => {
	fs.readFile('app/habbits.json', function (err, data) {
		var json = JSON.parse(data);
		json.habbits.push({
			"id": Date.now(),
			"name": req.body.name,
			"date": Date.parse(req.body.date)
		});
		fs.writeFile("app/habbits.json", JSON.stringify(json), function (err) {
			if (err) throw err;
			console.log('Data added to json file!');
		});
	})

	res.redirect("/");
});

app.get('/deleteHabbit', (req, res) => {
	fs.readFile('app/habbits.json', function (err, data) {
		var json = JSON.parse(data);

		for (let i = 0; i < json.habbits.length; i++) {
			if (json.habbits[i].id == req.query.id) {
				json.habbits.splice(i, 1);
			}
		}

		fs.writeFile("app/habbits.json", JSON.stringify(json), function (err) {
			if (err) throw err;
			console.log('Data deleted from json file!');
		});
	})

	res.redirect("/");
});

app.get('/editHabbit', (req, res) => {
	fs.readFile('app/habbits.json', function (err, data) {
		var json = JSON.parse(data);

		for (let i = 0; i < json.habbits.length; i++) {
			if (json.habbits[i].id == req.query.id) {
				json.habbits[i].name = req.query.name;
			}
		}

		fs.writeFile("app/habbits.json", JSON.stringify(json), function (err) {
			if (err) throw err;
			console.log('Data edit in json file!');
		});
	})

	res.redirect("/");
});

app.listen(process.env.PORT || 3000);
console.log('Server up and running on port: ' + (process.env.PORT || 3000));