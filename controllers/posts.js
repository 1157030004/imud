const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Post = require('../models/Post');

// @route   GET api/v1/posts
// @desc    Get posts
// @access  Public
exports.getPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().sort({ date: -1 });

  return res.status(200).json({
    success: true,
    count: posts.length,
    data: posts,
  });
});

// @route   GET api/v1/posts/:id
// @desc    Get post by id
// @access  Public
exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`No post with the id of ${req.params.id}`),
      404
    );
  }

  res.status(200).json({
    success: true,
    data: post,
  });
});

// @route   POST api/v1/posts
// @desc    Create post
// @access  Private
exports.addPost = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const post = await Post.create(req.body);

  res.status(200).json({
    success: true,
    data: post,
  });
});

// @desc    Update post
// @route   PUT /api/v1/post/:id
// @acces   Private
exports.updatePost = asyncHandler(async (req, res, next) => {
  let post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`No post with the id of ${req.params.id}`),
      404
    );
  }

  // Make sure user is course owner
  if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update a post ${post._id}`,
        401
      )
    );
  }

  post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: post,
  });
});

// @route   DELETE api/v1/posts/:id
// @desc    Delete post
// @access  Private
exports.deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`No post with the id of ${req.params.id}`),
      404
    );
  }

  // Make sure user is post owner
  if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete post ${post._id}`,
        401
      )
    );
  }

  await post.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @route   POST api/v1/posts/like/:id
// @desc    Like post
// @access  Private
exports.likePost = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id });
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`No post with the id of ${req.params.id}`),
      404
    );
  }

  if (
    post.likes.filter((like) => like.user.toString() === req.user.id).length > 0
  ) {
    return next(
      new ErrorResponse(` Post with Id ${req.params.id} has been liked`),
      404
    );
  }

  // Add user id to likes array
  await post.likes.unshift({ user: req.user.id });

  await post.save();

  res.status(200).json({
    success: true,
    data: post,
  });
});

// @route   POST api/v1/posts/unlike/:id
// @desc    Unlike post
// @access  Private
exports.unlikePost = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id });
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`No post with the id of ${req.params.id}`),
      404
    );
  }

  if (
    post.likes.filter((like) => like.user.toString() === req.user.id).length ===
    0
  ) {
    return next(
      new ErrorResponse(` Post with Id ${req.params.id} has been liked`),
      404
    );
  }

  // Get remove index
  const removeIndex = post.likes
    .map((item) => item.user.toString())
    .indexOf(req.user.id);

  // Splice out of array
  await post.likes.splice(removeIndex, 1);

  await post.save();

  res.status(200).json({
    success: true,
    data: post,
  });
});

// @route   POST api/v1/posts/comment/:id
// @desc    Add comment to post
// @access  Private
exports.commentPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`No post with the id of ${req.params.id}`),
      404
    );
  }

  await Course.create(req.body);

  // Add to comments array
  await post.comments.unshift(newComment);

  await post.save();

  res.status(200).json({
    success: true,
    data: post,
  });
});

// @route   DELETE api/v1/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
exports.uncommentPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (
    post.comments.filter(
      (comment) => comment._id.toString() === req.params.comment_id
    ).length === 0
  ) {
    return next(
      new ErrorResponse(`No comment with the post id of ${req.params.id}`),
      404
    );
  }

  // Get remove index
  const removeIndex = await post.comments
    .map((item) => item._id.toString())
    .indexOf(req.params.comment_id);

  // Splice comment out of array
  await post.comments.splice(removeIndex, 1);

  await post.save();
  res.status(200).json({
    success: true,
    data: post,
  });
});

// @desc    Upload photo for post
// @route   PUT /api/v1/posts/:id/photo
// @acces   Private
exports.postPhotoUpload = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is post owner
  if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this post`,
        401
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse('Please upload a file', 400));
  }

  const file = req.files.file;

  // Make sure the file is photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse('Please upload an image file', 400));
  }

  // Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom file name
  file.name = `photo_${post._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Post.findByIdAndUpdate(req.params.id, {
      photo: file.name,
    });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
