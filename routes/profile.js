const express = require('express');
const {
  getMyProfile,
  getProfiles,
  getProfileUser,
  addProfile,
  updateProfile,
  deleteProfile,
} = require('../controllers/profile');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, getMyProfile)
  .post(protect, addProfile)
  .put(protect, updateProfile)
  .delete(protect, deleteProfile);

router.route('/all').get(getProfiles);

router.route('/user/:user_id').get(getProfileUser);

module.exports = router;
