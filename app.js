//jshint esversion: 6
//jshint esversion: 8
const express = require("express");
const app = express();
// The got module allows us to make http requests to external servers
const got = require("got");
const port = process.env.PORT || 2000; //for heroku!!
// urlencoded allows us to tap into responses
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); //static allows us to choose a folder where our static files (like css and images) will reside.

//home route
app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/signup.html`);
});

//post route
app.post("/", (req, res) => {
    let name = req.body.name;
    let email = req.body.email;

    // data needed by mailchimp servers to process our request.
    let data = JSON.stringify({
        members: [
            {
                //members is an array of objects with member details
                email_address: email,
                status: "subscribed",
                merge_data: {
                    // merge data is used to provide more details like first name etc.
                    FNAME: name
                }
            }
        ]
    }); //Always convert any POST data to JSON before posting!!
    (async () => {
        const options = {
            url: "https://us19.api.mailchimp.com/3.0/lists/918954731d",
            method: "POST",
            //use this for basic authentication
            headers: {
                Authorization: "insculpt d651286af8e3c7e26f72b72659443a70-us19"
            },
            body: data
        };
        try {
            const response = await got(options);
            res.sendFile(`${__dirname}/success.html`);
        } catch (error) {
            console.log(error);
            res.sendFile(`${__dirname}/failure.html`);
        }
    })();
});

app.post("/failure", (req, res) => {
    res.redirect('/'); //will redirect to the sign up page.
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});
