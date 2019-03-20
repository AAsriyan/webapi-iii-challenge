const express = require("express");

const Posts = require("./postDb.js");

const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  try {
    const posts = await Posts.get(req.query);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the user's posts."
    });
  }
});

postRouter.post("/", async (req, res) => {
  try {
    const postInfo = req.body;
    const post = await Posts.insert(req.body);
    const { text, user_id } = req.body;

    if (!user_id || !text || !postInfo) {
      res.status(400).json({
        error: "Please provide some text and a user id for the post."
      });
    } else {
      res.status(201).json(post);
    }
  } catch (error) {
    res.status(500).json({
      error: "There was an error while saving the post to the database"
    });
  }
});

postRouter.get("/:id", async (req, res) => {
  try {
    const post = await Posts.getById(req.params.id);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: `The posts with the id #${req.params.id} does not exist.`
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "The post information could not be found."
    });
  }
});

postRouter.delete("/:id", async (req, res) => {
  try {
    const count = await Posts.remove(req.params.id);

    if (count > 0) {
      res.status(200).json({
        message: "The post has been deleted."
      });
    } else {
      res.status(404).json({
        message: `The post with the id #${req.params.id} could not be found`
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "The post could not be removed."
    });
  }
});

postRouter.put("/:id", async (req, res) => {
  try {
    const { text, user_id } = req.body;
    const { id } = req.params;
    const post = await Posts.update(id, req.body);

    if (!post) {
      res.status(404).json({
        message: `The post with the id #${id} does not exist`
      });
    } else if (!text || !user_id || !req.body) {
      res.status(400).json({
        errorMessage: "Please provide some text for this user"
      });
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(500).json({
      error: "The post information could not be updated."
    });
  }
});

module.exports = postRouter;
