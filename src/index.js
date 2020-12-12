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
  if (req.query.course) {
    connection
      .find({ course: { $regex: req.query.course, $options: "$i" } })
      .then((data) => res.send(data));
  } else if (req.query.state) {
    connection
      .find({ state: { $regex: req.query.state, $options: "$i" } })
      .then((data) => res.send(data));
  } else if (req.query.name) {
    connection
      .find({ name: { $regex: req.query.name, $options: "$i" } })
      .then((data) => res.send(data));
  } else if (req.query.city) {
    connection
      .find({ city: { $regex: req.query.city, $options: "$i" } })
      .then((data) => res.send(data));
  } else {
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
