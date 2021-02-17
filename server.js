const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const fs = require('fs');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))

router.get("/", (req, res) => {
	res.sendFile(path.join(__dirname+'/index.html'));
});

router.get("/add.html", (req, res) => {
	res.sendFile(path.join(__dirname+'/add.html'));
});

app.post('/addHabbit', (req, res) => {
	fs.readFile('habbits.json', function (err, data) {
		var json = JSON.parse(data);
		json.habbits.push({
			"id": Date.now(),
			"name": req.body.name,
			"date": Date.parse(req.body.date)
		});
		fs.writeFile("habbits.json", JSON.stringify(json), function (err) {
			if (err) throw err;
			console.log('Data added to json file!');
		});
	})

	res.redirect("/");
});

app.get('/deleteHabbit', (req, res) => {
	fs.readFile('habbits.json', function (err, data) {
		var json = JSON.parse(data);
		console.log(req.query.id);

		for (let i = 0; i < json.habbits.length; i++) {
			if (json.habbits[i].id == req.query.id) {
				json.habbits.splice(i, 1);
			}
		}

		fs.writeFile("habbits.json", JSON.stringify(json), function (err) {
			if (err) throw err;
			console.log('Data deleted from json file!');
		});
	})

	res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/editHabbit', (req, res) => {
	fs.readFile('habbits.json', function (err, data) {
		var json = JSON.parse(data);
		console.log(req.query.id, req.query.name, req.body.name);

		for (let i = 0; i < json.habbits.length; i++) {
			if (json.habbits[i].id == req.query.id) {
				json.habbits[i].name = req.query.name;
			}
		}

		fs.writeFile("habbits.json", JSON.stringify(json), function (err) {
			if (err) throw err;
			console.log('Data edit in json file!');
		});
	})

	res.sendFile(path.join(__dirname+'/index.html'));
});

router.get('/assets/js/index.js', function (req, res) {
	res.sendFile(path.join(__dirname + '/assets/js/index.js'));
});

router.get('/habbits.json', function (req, res) {
	res.sendFile(path.join(__dirname + '/habbits.json'));
});

app.use("/", router);
app.listen(process.env.PORT || 3000);
console.log('Server up and running on port: 3000');