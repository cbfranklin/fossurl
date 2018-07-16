const express = require("express");
const bodyParser = require("body-parser");
const needle = require("needle");
const app = express();

const endpoint = `https://design-language-json.herokuapp.com/ea13c65608080e294dced7f519224c64949f0c80fb9ce212c4d39d5b5d9f1a92`;

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

app.get("/:slug", (req, res) => {
  var slug = req.params.slug;
  console.log("/:slug", slug);
  //   fetch(`${endpoint}/${slug}/1`).then(function(response) {
  //     res.redirect(response.json().url);
  //   });

  //   request(`${endpoint}/${slug}`, function(error, response, body) {
  //     console.log(error, response, body);
  //   });
  needle.get(`${endpoint}/${slug}`, function(error, response) {
    if (!error && response.statusCode == 200) console.log(response.json);
  });
});

app.post("/create", function(req, res) {
  console.log("/create");
  console.log("body:", req.body);
  var slug = req.body.slug;
  var url = req.body.url;
  console.log(slug, url);
  if (!url) {
    url = randomShortURL();
  }

  //   request.post(
  //     { url: "http://service.com/upload",
  //     form: { key: "value" }
  // },
  //     function(err, httpResponse, body) {
  //       /* ... */
  //     }
  //   );
  needle("put", `${endpoint}/${slug}`, { url: url })
    .then(function(response) {
      res.send(response);
    })
    .catch(function(err) {
      console.log("error!",err);
    });
});

app.use("/", express.static("static"));

function randomShortURL() {
  return (
    Math.random()
      .toString(32)
      .substring(2, 5) +
    Math.random()
      .toString(36)
      .substring(2, 5)
  );
}

app.listen(3000, () => console.log("Listening for requests on port 3000"));
