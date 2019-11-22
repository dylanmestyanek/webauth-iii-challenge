const express = require("express");

const middlewareConfig = require("./middleware-config");
const apiRouter = require("./api-router");

const server = express();

middlewareConfig(server);
server.use("/api", apiRouter);

module.exports = server;