const express = require('express');
const router = express.Router();
const db = require('../db');
const { auth } = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const posts = await db.getPosts();
  res.json({ posts });
});

router.post('/', auth, async (req, res) => {
  const { title, content } = req.body;
  const post = await db.createPost(title, content, req.userId);
  res.json({ post });
});

router.get('/:id', auth, async (req, res) => {
  const post = await db.getPostById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.json({ post });
});

router.put('/:id', auth, async (req, res) => {
  const { title, content } = req.body;
  const updatedPost = await db.updatePost(req.params.id, title, content);
  res.json({ updatedPost });
});

router.delete('/:id', auth, async (req, res) => {
  const deletedPost = await db.deletePost(req.params.id);
  res.json({ deletedPost });
});

module.exports = router;
