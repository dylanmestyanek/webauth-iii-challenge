const express = require("express");

const middlewareConfig = require("./middleware-config");

const server = express();

middlewareConfig(server);

module.exports = server;