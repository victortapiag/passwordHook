// server.js

const express = require("express");
const app = express();


app.use(express.static("public"));


app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});


// basic auth and parsing
const basicAuth = require("express-basic-auth");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

/*app.use(
  basicAuth({
    users: { admin: "supersecret" },
    unauthorizedResponse: (req) => "Unauthorized",
  })
);*/

//Password Inline Hook POST from Okta (endpoint: passwordHook)

app.post("/passwordHook", async (request, response) => {
  console.log(request.body.data);

  /*if (user.username & user.password) then */

  var returnValue = {
    commands: [
      {
        type: "com.okta.action.update",
        value: 
          { 
            "credential":"VERIFIED"
          }
      }
    ],
  }
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

