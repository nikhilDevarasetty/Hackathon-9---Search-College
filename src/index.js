const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connections } = require("mongoose");

const { connection } = require("./connector");

// app.get("/findColleges", (req, res) => {
//   if (req.query.course) {
//     connection
//       .find({ course: { $regex: req.query.course, $options: "$i" } })
//       .then((data) => res.send(data));
//   } else if (req.query.state) {
//     connection
//       .find({ state: { $regex: req.query.state, $options: "$i" } })
//       .then((data) => res.send(data));
//   } else if (req.query.name) {
//     connection
//       .find({ name: { $regex: req.query.name, $options: "$i" } })
//       .then((data) => res.send(data));
//   } else if (req.query.city) {
//     connection
//       .find({ city: { $regex: req.query.city, $options: "$i" } })
//       .then((data) => res.send(data));
//   } else if (req.query.minPackage) {
//     const minPackage = Number(req.query.minPackage);
//     connection
//       .aggregate({
//         $project: {
//           name: 1,
//           city: 1,

//           gteminpac: { $gte: ["$minPackage", minPackage] },
//         },
//       })
//       .then((data) => res.send(data));
//   } else {
//   }
// });

app.get("/findColleges", async (req, res) => {
  let queryCond = {};
  if (req.query.name) {
    queryCond.name = { $regex: req.query.name, $options: "i" };
  }
  if (req.query.state) {
    queryCond.state = { $regex: req.query.state, $options: "i" };
  }
  if (req.query.city) {
    queryCond.city = { $regex: req.query.city, $options: "i" };
  }
  if (req.query.course) {
    queryCond.course = { $regex: req.query.course, $options: "i" };
  }
  if (req.query.exam) {
    queryCond.exam = { $regex: req.query.exam, $options: "i" };
  }
  if (
    req.query.minPackage &&
    !isNaN(Number(req.query.minPackage)) &&
    Number(req.query.minPackage) > 0
  ) {
    const curPack = Number(req.query.minPackage);
    queryCond.minPackage = { $gte: curPack };
  }
  if (
    req.query.maxFees &&
    !isNaN(Number(req.query.maxFees)) &&
    Number(req.query.maxFees) > 0
  ) {
    const curFees = Number(req.query.maxFees);
    queryCond.maxFees = { $lte: curFees };
  }
  res.send(await connection.find(queryCond));
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
