const express = require("express");
const helmet = require("helmet");

const userRouter = require("./data/helpers/userRouter.js");
const postRouter = require("./data/helpers/postRouter.js");

const server = express();

server.use(express.json());
server.use(helmet());

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome to the Lambda Hubs API</p>
    `);
});

module.exports = server;
