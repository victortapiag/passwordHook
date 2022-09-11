// server.js

const express = require("express");
const app = express();


app.use(express.static("public"));
require('dotenv').config();


app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});


// basic auth and parsing
const basicAuth = require("express-basic-auth");
const bodyParser = require("body-parser");

var domains = process.env.DOMAINS.split(', ');
  console.log('Passwords accepted from these domains: ', domains);

app.use(bodyParser.json());

/*app.use(
  basicAuth({
    users: { admin: "supersecret" },
    unauthorizedResponse: (req) => "Unauthorized",
  })
);*/

//Password Inline Hook POST from Okta (endpoint: passwordHook)

app.post("/passwordHook", async (request, response) => {
  console.log(request.headers);
  console.log(request.body.data);

  let userid = request.body.data.context.credential.username;
  console.log(userid);
  let ampersandPos = userid.indexOf("@");
  console.log("@ is at: ", ampersandPos);
  let userDomain = userid.substr(ampersandPos+1).toLowerCase();
  console.log(userDomain);

  var returnValue = {
             commands: [
             {
             type: "com.okta.action.update",
             value:
                     {
                     "credential":"UNVERIFIED"
                     }
             }
             ],
     }

  if (domains.includes(userDomain)) {
	console.log("TRUE");
	returnValue.commands[0].value.credential = "VERIFIED"
	}
  else {
	console.log("FALSE");
	}


  /*if (user.username & user.password) then */

/*
 *
 * End of Password Inline Hook Code
 *
 */
 console.log(JSON.stringify(returnValue));
 response.send(JSON.stringify(returnValue));
});



const listener = app.listen(3002, () => {
  console.log("Your app is listening on port " + listener.address().port);
}
);

