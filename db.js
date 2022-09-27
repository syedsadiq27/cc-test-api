const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();

module.exports = async function connection() {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    if (!process.env.DB_CONNECTION_STRING)
      throw new Error("Mongo Connection String not found");
    mongoose.connect(process.env.DB_CONNECTION_STRING, connectionParams);
    console.log("connected to database");
  } catch (error) {
    console.log(error);
    console.log("could not connect to database");
  }
};
