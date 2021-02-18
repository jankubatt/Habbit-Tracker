const express = require("express");
const app = express();
const path = require("path");
const fs = require('fs');

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname+'/index.html'));
});

app.get("/add.html", (req, res) => {
	res.sendFile(path.join(__dirname+'/add.html'));
});

app.listen(process.env.PORT || 3000);
console.log('Server up and running on port: ' + (process.env.PORT || 3000));