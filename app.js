//jshint esversion: 6
//jshint esversion: 8
const express = require("express");
const app = express();
const got = require('got');
const port = 5600;
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", (req, res)=>{
    res.sendFile(`${__dirname}/signup.html`);
});

app.post("/success.html", (req, res)=>{
    let name = req.body.name;
    let email = req.body.email;

    console.log(`${name} ${email}`);
    res.send();
});

app.listen(port, ()=>{
    console.log("Server listening on port " + port);
});