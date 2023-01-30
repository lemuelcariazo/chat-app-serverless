const { development } = require("./src/config/config");
const cookieParser = require("cookie-parser");
const userRoutes = require("./src/routes/userRoutes");

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
require("dotenv").config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "http://localhost:4000",
      "http://localhost:5173",
      "https://chat-app-serverless.vercel.app",
      "https://chat-app-serverless-lemuelcariazo.vercel.app",
    ],
    credentials: true,
  })
);

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

app.use("/api/", userRoutes); // my starting route

app.use(express.static(path.join(__dirname, "client", "dist")));
app.get("*", (__, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
