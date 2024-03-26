require('dotenv').config({path: "./.env"})
const { env } = require('process');
const express = require("express");
const app = express();
const cors = require("cors");
const controller = require('./controller.js');
//making sure the server can only be accessed from our client
const corsOptions = {
  origin: env.CLIENT_API_KEY,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/weather/:city", controller.fetchData)

const port = env.PORT_KEY
app.listen(port, () => {
  console.log(`server listening on ${port}`);
});