const express = require('express');
const tagsRouter = express.Router();

const { getAllTags, getPostsByTagName } = require('../db');

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");
  next();
});

tagsRouter.get('/', async (req, res) => {
  const tags = await getAllTags();
  res.send({
  tags
  });
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
  // read the tagname from the params
  const { tagName } = req.params;

  try {
    // use our method to get posts by tag name from the db
    const postTags = await getPostsByTagName(tagName);
    // send out an object to the client { posts: // the posts }
    
    const posts = postTags.filter(post => {
      // keep a post if it is either active, or if it belongs to the current user
      return post.active || (req.user && post.author.id === req.user.id);
    });

    res.send({
      posts
    });
  } catch ({ name, message }) {
    // forward the name and message to the error handler
    next({
      name: "Tag Name Error",
      message: "Unable to find posts by that tag name"
    });
  }
});

module.exports = tagsRouter;