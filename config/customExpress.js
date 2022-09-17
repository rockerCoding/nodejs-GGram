const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')
const cors=require("cors");

module.exports = () => {
  const app = express();

  const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
  }
  app.use(cors(corsOptions))

  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())

  consign()
    .include('controllers')
    .into(app);

  return app;
}
