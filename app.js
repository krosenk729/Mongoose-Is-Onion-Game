const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const logger = require("morgan");
const mongojs = require("mongojs");
const mongoose = require("mongoose");
const app = express();


// =============================================================
// Middleware 

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.static( path.join(__dirname, "src", "client") ));

// =============================================================
// API Endpoint Routes

const api = require("./src/server/api");
app.use("/api", api);

// =============================================================
// Views

app.get("*", function(req, res){
	res.sendFile( path.join(__dirname, "src", "client", "index.html") );
});

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});