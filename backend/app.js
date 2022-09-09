const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes/routes");
const session = require("express-session");
const mongoose = require("mongoose");
var cors = require("cors");
const timeout = require("connect-timeout");
//Initializing connection string
mongoose
  .connect("mongodb+srv://viesignteam:vuesugn123@viesign.ddk0k.mongodb.net/viesign", { useNewUrlParser: true })
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });

app.use(timeout("30s"));
app.use(bodyParser.urlencoded());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

/*
app.use(
  session({
    secret: "mySecretKey",
    resave: true,
    saveUninitialized: false,
  })
);*/

app.use(express.json({limit: '50mb'}));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.use("/api", routes.routes);

module.exports = app;
