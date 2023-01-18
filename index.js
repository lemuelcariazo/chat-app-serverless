const { development } = require("./src/config/config");
const cookieParser = require("cookie-parser");

// const routes = require("./routes/routes");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "http://localhost:3000",
      "https://test-app-beta-ten.vercel.app",
    ],
    credentials: true,
  })
);

// connect db
mongoose.set("strictQuery", true);
mongoose.connect(
  development.database.user,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("database connection established");
    }
  }
);

app.get("/api", (__, res) => {
  try {
    res.send("it is now working fine and can communicate with the client");
  } catch (e) {
    res.send(e);
  }
});

// serverless static deployment
app.use(express.static(path.join(__dirname, "client", "dist")));
app.get("*", (__, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
// console.log(process.cwd());

// start of routes

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
