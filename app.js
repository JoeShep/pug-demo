'use strict';

const express = require('express');
const app = express();

app.use(express.static('public'));
const port = process.env.PORT || 8080
// Why? Why?
app.set('port', port);
app.set('larry', 'My name is not Larry')
console.log("locals", app.locals.settings);

app.set('view engine', 'pug');
app.set('wow', "Express is MAGIC")

const names = ["Larry", "Moe", "Curly", "Mr. Rogers"];
app.get('/', (req, res, next) => {
  res.render('index', {
    subtitle: "This came from my JS data", 
    names, 
    loggedIn: false, 
    port: app.locals.settings.port, 
    url: `${req.url}`
  });
});

app.get('/article', (req, res, next) => {
  res.render('article', {subtitle: "This came from my JS data", names, loggedIn: true, url: `${req.url}` })
});

app.listen(port, () =>
  console.log(`Listening on port ${port}`)
)
