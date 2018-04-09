const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/pugstuff.sqlite");

db.run(`DROP TABLE IF EXISTS movies`);

db.run(`CREATE TABLE IF NOT EXISTS movies (
    movie_id INTEGER PRIMARY KEY,
    title TEXT UNIQUE NOT NULL)`
);
