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


app.post("/success", (req, res)=>{
    try {
        let name = req.body.name;
        let email = req.body.email;
        let data = JSON.stringify({
            members: [{
            email_address: email,
            status: "subscribed",
            merge_data: {
                FNAME: name
            }
        }]
        }); //Always convert any POST data to JSON before posting!!
        (async () => {
            const options = {
                url: 'https://us19.api.mailchimp.com/3.0/lists/918954731d',  
                method: 'POST',
                headers: //use this for basic authentication
                    {"Authorization":  "insculpt d651286af8e3c7e26f72b72659443a70-us19"
                }, 
                body: data
            };
            try {
                const response = await got(options);
                console.log(response.body.statusCode);
                
            } catch (error) {
                console.log(error.response.body);
                
            }
        })();
    
        console.log(`${name} ${email}`);
        res.sendFile(`${__dirname}/success.html`);
    } catch (error) {
        res.sendFile(`${__dirname}/failure.html`);
    }
   
    
});
app.get("/success", (req, res)=>{
    res.sendFile(`${__dirname}/success.html`);
});
app.get("/failure", (req, res)=>{
    res.sendFile(`${__dirname}/failure.html`);
});


app.listen(port, ()=>{
    console.log("Server listening on port " + port);
});

