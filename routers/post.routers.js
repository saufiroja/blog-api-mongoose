const router = require('express').Router();

const {
  createPost,
  getAllPost,
  getPostByTitle,
} = require('../controllers/post.controllers');
const { authVerify } = require('../middlewares/jwt.middlewares');

router.get('/posts', authVerify, getAllPost);
router.get('/posts/:title', authVerify, getPostByTitle);

router.post('/posts', authVerify, createPost);

module.exports = router;
