const express = require("express");
const session = require("express-session");
const massive = require("massive");
const bodyParser = require("body-parser");
const authController = require("./controllers/authController");
require("dotenv").config();
const app = express();
const { SESSION_SECRET, CONNECTION_STRING } = process.env;
const PORT = 4000;

app.use(bodyParser.json());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET
  })
);

massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    console.log("db connected 🤓");
  })
  .catch(error => {
    console.error("Error connecting to database 🤬", error);
  });

//Auth
app.post("/auth/register", authController.register);
app.post("/auth/login", authController.login);
app.get("/auth/logout", authController.logout);

app.get("/api/user", authController.getUser);

app.listen(PORT, () => console.log(`Listening on port ${PORT} 🔥 🏆 💪 🥇 🔥`));
