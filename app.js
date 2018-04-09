"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Add when demoing weird PUT/DELETE stuff
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/pugstuff.sqlite");

// app.use(express.static('public'));

app.set("larry", "My name is not Larry");
console.log("locals", app.locals.settings);

app.set("view engine", "pug");
app.set("wow", "Express is MAGIC");

const names = ["Larry", "Moe", "Curly", "Mr. Rogers"];

app.use(express.static(__dirname + "/public")); //render index.html then rename as monkey.html
app.use("/bootstrap", express.static(__dirname + "/node_modules/bootstrap/dist/")); //look in node_modules for any requests that come in for bootstrap
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get('/monkey', (req, res, next) => {
//   res.sendFile(__dirname + '/public/monkey.html')
// });

app.get("/", (req, res, next) => {
  let homeData = {
    subtitle: "This came from my JS data",
    names,
    port: app.locals.settings.port,
    url: req.url
  };
  db.all(`SELECT title from movies`, (err, movies) => {
    if(movies.length > 0) {
      console.log(movies)
      homeData.movies = movies
    }
    res.render("index", homeData);
  });
});

app.post("/", (req, res, next) => {
  console.log("post called", req.body.title);

  db.run(`INSERT into movies values (null, "${req.body.title}")`, function() {
    console.log(`New movie added at id #${this.lastID}`);
    res.redirect("/");
  });
});

let nationalParks = {
  AK: {
    state: "Alaska",
    parks: [{ name: "Cold Stuff Place" }, { name: "Brrrrr Nat'l Park" }]
  },
  AR: {
    state: "Arkansas",
    parks: [
      { name: "Paddle Faster Refuge" },
      { name: "Dueling Banjos Nat'l Monument" }
    ]
  },
  AZ: { state: "Arizona", parks: [] },
  CA: { state: "California", parks: [] },
  CO: { state: "Colorado", parks: [] },
  FL: { state: "Florida", parks: [] },
  HI: { state: "Hawaii", parks: [{ name: "Surf's Up National Seashore" }] },
  ID: { state: "Idaho", parks: [{ name: "World's Biggest Tater Park" }] },
  KY: { state: "Kentucky", parks: [] },
  ME: { state: "Maine", parks: [] },
  MI: { state: "Michigan", parks: [] },
  MN: { state: "Minnesota", parks: [] },
  MT: { state: "Montana", parks: [] },
  TN: {
    state: "Tennessee",
    parks: [{ name: "Rush Hour Gridlock Picnic Area" }]
  },
  ND: { state: "North Dakota", parks: [] },
  NM: { state: "New Maexico", parks: [] },
  NV: { state: "Nevada", parks: [] },
  OH: {
    state: "Ohio",
    parks: [{ name: "Flat 'n Boring Park" }, { name: "Filthy Lakes Beach" }]
  },
  OR: { state: "Oregon", parks: [] },
  SC: { state: "South Carolina", parks: [] },
  SD: {
    state: "South Dakota",
    parks: [{ name: "Dead White Guys National Park" }]
  },
  TX: { state: "Texas", parks: [] },
  UT: { state: "Utah", parks: [] },
  VA: { state: "Virginia", parks: [] },
  VI: {
    state: "Virgin Islands",
    parks: [{ name: "Worst Ski Resort Ever National Park" }]
  },
  WA: { state: "Washington", parks: [] },
  WY: { state: "Wyoming", parks: [{ name: "Cowboy Happy Land" }] }
};

app.get("/parks", (req, res, next) => {
  console.log("Parks", nationalParks);

  res.render("parks", { parks: nationalParks });
});

app.get("/article", (req, res, next) => {
  res.render("article", {
    subtitle: "This came from my JS data",
    names,
    loggedIn: true,
    url: `${req.url}`
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
