const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connections } = require("mongoose");

const { connection } = require("./connector");

app.get("/findColleges", (req, res) => {
  connection
    .find(req.query)
    .then((data) => res.send(data))
    .catch((err) => res.send(err.message));
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
