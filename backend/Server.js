const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require("path");
const { connect } = require("http2");
const util = require("util");

require("dotenv").config();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3001;

let connection = mysql.createConnection({
  host: process.env.DATABASE_URL,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
});
connection.connect((err) => {
  if (err) {
    console.log(
      "Port is ",
      process.env.DATABASE_PORT,
      process.env.DATABASE_URL
    );
    throw err;
  }
  console.log("Connected!");
});
connection = util.promisify(connection.query).bind(connection);

app.get("/", (_req, _res) => {
  console.log("Request at /");
  _res.send("Hello, You are at IIT Goa Affiliation SBT Server...");
});

app.post("/createIDCardTable", async (req, res) => {
  console.log("Create IDCard Table ");
  let query =
    "CREATE TABLE IDCard (userAccAddr VARCHAR(100) PRIMARY KEY, txHash VARCHAR(100) )";
  const queryRes = await connection(query)
    .then(() => 1)
    .catch(() => 0);

  if (queryRes) {
    return res.send({
      status: true,
    });
  } else {
    return res.send({
      status: false,
    });
  }
});

app.post("/saveTxHash", async (req, res) => {
  console.log("Save Tx Hash");
  let query = `INSERT INTO IDCard (userAccAddr, txHash) VALUES ('${req.body.userAccAddr}', '${req.body.txHash}')`;
  const queryRes = await connection(query)
    .then(() => 1)
    .catch(() => 0);

  if (queryRes) {
    return res.send({
      status: true,
    });
  } else {
    return res.send({
      status: false,
    });
  }
});

app.get("/getTxHash", async (req, res) => {
  console.log("Get Tx Hash", req.query.userAccAddr);
  let query = `SELECT txHash FROM IDCard WHERE userAccAddr = '${req.query.userAccAddr}'`;
  const queryRes = await connection(query)
    .then((res) => res)
    .catch(() => 0);
  if (queryRes) {
    return res.send({
      status: true,
      data: queryRes[0],
    });
  } else {
    return res.send({
      status: false,
    });
  }
});

app.listen(port, () => {
  console.log("listening on PORT", port);
});
