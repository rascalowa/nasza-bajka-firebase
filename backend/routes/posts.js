const express = require('express');

const PostController = require('../controllers/posts');
const extractFile = require('../middleware/file');

const router = express.Router();

router.post("", extractFile, PostController.createPost);

router.put("/:id", extractFile, PostController.updatePost);

router.get("", PostController.getPost);

router.get("/:id", PostController.getPosts);

router.delete("/:id", PostController.deletePost);

module.exports = router;
