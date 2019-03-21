const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const userRouter = require("./data/helpers/userRouter.js");
const postRouter = require("./data/helpers/postRouter.js");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda Blog API</h2>
    <p>Welcome to the Lambda Blog API</p>
    <p>Greeting: ${process.env.GREETING}</p>
    `);
});

module.exports = server;
