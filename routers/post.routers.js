const router = require('express').Router();

const {
  createPost,
  getAllPost,
  getPostByTitle,
  updatePost,
  deletePost,
} = require('../controllers/post.controllers');
const { authVerify } = require('../middlewares/jwt.middlewares');

router.get('/posts', authVerify, getAllPost);
router.get('/posts/:title', authVerify, getPostByTitle);

router.post('/posts', authVerify, createPost);

router.put('/posts/:id', authVerify, updatePost);

router.delete('/posts/:id', authVerify, deletePost);

module.exports = router;
