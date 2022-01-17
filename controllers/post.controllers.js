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

    const countPost = await Post.count();
    const post = await Post.find();

    return res.status(200).json({
      message: 'successfully get all post',
      code: 200,
      post,
      countPost,
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

// UPDATE POST
exports.updatePost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;

    const post = await Post.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    return res.status(200).json({
      message: 'successfully update post',
      code: 200,
      post,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE POST
exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);

    return res.status(200).json({
      message: 'successfully delete post',
      code: 200,
      post,
    });
  } catch (error) {
    next(error);
  }
};
