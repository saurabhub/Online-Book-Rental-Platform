const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/connect");
const morgan = require("morgan");
const { readdirSync } = require("fs");
const cors = require('cors');

const port = 5000;
const maxRequestBodySize = '1mb';

//middlewares
app.use(cors())
app.use(express.json({limit: maxRequestBodySize}));
app.use(morgan("dev"));


readdirSync("./routes").map((route) =>
  app.use("/api", require(`./routes/${route}`))
);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
