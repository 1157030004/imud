const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/aynsc');
const Profile = require('../models/Profile');
const User = require('../models/User');

// @route   GET api/v1/profile
// @desc    Get current users profile
// @access  Private
exports.getMyProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id }).populate(
    'user',
    ['name', 'avatar']
  );

  if (!profile) {
    return next(
      new ErrorResponse(`No profile with the id of ${req.params.id}`),
      404
    );
  }

  res.status(200).json({
    success: true,
    data: profile,
  });
});

// @route   GET api/v1/profile/all
// @desc    Get all profiles
// @access  Public
exports.getProfiles = asyncHandler(async (req, res, next) => {
  const profiles = await Profile.find({ user: req.user.id }).populate('user', [
    'name',
    'avatar',
  ]);

  if (!profiles) {
    return next(new ErrorResponse(`There are no profiles`), 404);
  }

  res.status(200).json({
    success: true,
    data: profiles,
  });
});

// @route   GET api/v1/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
exports.getProfileUser = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findById({ user: req.user.id }).populate(
    'user',
    ['name', 'avatar']
  );

  if (!profile) {
    return next(
      new ErrorResponse(`There is no profile with Id of ${req.user.id}`),
      404
    );
  }

  res.status(200).json({
    success: true,
    data: profile,
  });
});

// @route   POST api/v1/profile
// @desc    Create or edit user profile
// @access  Private
exports.addProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findById({ user: req.user.id });

  if (!profile) {
    return next(
      new ErrorResponse(`There is no profile with Id of ${req.user.id}`),
      404
    );
  }

  res.status(200).json({
    success: true,
    data: profile,
  });
});

// @route   DELETE api/v1/profile
// @desc    Delete user and profile
// @access  Private
exports.deleteProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findByIdAndDelete({ user: req.user.id });

  const user = await User.findByIdAndDelete({ _id: req.user.id });

  res.status(200).json({
    success: true,
    data: {},
  });
});
