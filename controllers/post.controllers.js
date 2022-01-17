const createError = require('http-errors');
const { Post } = require('../database/models/Post.models');

// CREATE POST
exports.createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    // const userId = req.user.id;

    // if (!userId) {
    //   return next(createError(401, 'unauthorized'));
    // }

    const post = await Post.create({
      title,
      content,
    });

    return res.status(201).json({
      message: 'successfully create post',
      code: 201,
      post,
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL POST
exports.getAllPost = async (req, res, next) => {
  try {
    const userId = req.user.id;
    // if (!userId) {
    //   return next(createError(401, 'unauthorized'));
    // }

    const post = await Post.find();

    return res.status(200).json({
      message: 'successfully get all post',
      code: 200,
      post,
    });
  } catch (error) {
    next(error);
  }
};

// GET POST BY TITLE
exports.getPostByTitle = async (req, res, next) => {
  try {
    const { title } = req.params;

    // const userId = req.user.id;
    // if (!userId) {
    //   return next(createError(401, 'unauthorized'));
    // }

    const post = await Post.find({ title });
    if (post.length == 0) {
      return next(createError(404, 'post not found'));
    }

    return res.status(200).json({
      message: 'successfully get post by title',
      code: 200,
      post,
    });
  } catch (error) {
    next(error);
  }
};
