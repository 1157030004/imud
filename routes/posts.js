const express = require('express');
const {
  getPosts,
  getPost,
  addPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  commentPost,
  uncommentPost,
  postPhotoUpload,
} = require('../controllers/posts');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(getPosts)
  .post(protect, authorize('publisher', 'admin'), addPost);
router
  .route('/:id')
  .get(getPost)
  .put(protect, authorize('publisher', 'admin'), updatePost)
  .delete(protect, authorize('publisher', 'admin'), deletePost);
router.route('/like/:id').post(protect, likePost);
router.route('/unlike/:id').post(protect, unlikePost);
router.route('/comment/:id').post(protect, commentPost);
router.route('/comment/:id/:comment_id').delete(protect, uncommentPost);
router
  .route('/:id/photo')
  .put(protect, authorize('publisher', 'admin'), postPhotoUpload);

module.exports = router;
