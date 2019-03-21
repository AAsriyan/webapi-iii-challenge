const express = require("express");

const Users = require("./userDb");
const Posts = require("./postDb");
const upperCaseName = require("../middleware/upperCaseName.js");

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    const users = await Users.get(req.query);
    res.status(200).json({ greeting: process.env.GREETING, users });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the users."
    });
  }
});

userRouter.post("/", upperCaseName, async (req, res) => {
  const user = await Users.insert(req.body);

  const userInfo = req.body;
  console.log(user);
  try {
    if (!userInfo.name) {
      res.status(400).json({
        errorMessage: "Please provide a name for the user."
      });
    } else {
      res.status(201).json(user);
    }
  } catch (error) {
    res.status(500).json({
      error: "There was an error while saving the user to the database."
    });
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
    const user = await Users.getById(req.params.id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        message: `The user with the id #${req.params.id} does not exist.`
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "The user information could not be found."
    });
  }
});

userRouter.get("/:id/posts", async (req, res) => {
  try {
    const user = await Users.getById(req.params.id);
    const allUserPosts = await Users.getUserPosts(req.params.id);

    if (!user) {
      res.status(404).json({
        message: `The user with the id #${req.params.id} does not exist`
      });
    } else {
      res.status(200).json(allUserPosts);
    }
  } catch (error) {
    res.status(500).json({
      error: "Could not retrieve the user's posts"
    });
  }
});

userRouter.delete("/:id", async (req, res) => {
  try {
    const posts = await Users.getUserPosts(req.params.id);
    await posts.forEach(async post => {
      await Posts.remove(post.id);
    });
    const count = await Users.remove(req.params.id);

    if (count > 0) {
      res.status(200).json({
        message: "The user has been deleted."
      });
    } else {
      res.status(404).json({
        message: `The user with the id #${req.params.id} could not be found`
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "The user could not be removed."
    });
  }
});

userRouter.put("/:id", upperCaseName, async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    // const user = await Users.update(id, {
    //   ...req.body,
    //   name: name.toUpperCase()
    // });
    const user = await Users.update(id, req.body);

    if (!user) {
      res.status(404).json({
        message: `The user with the id #${id} does not exist`
      });
    } else if (!name || !req.body) {
      res.status(400).json({
        errorMessage: "Please provide a name for this user"
      });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({
      error: "The user information could not be updated."
    });
  }
});

module.exports = userRouter;
