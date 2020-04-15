const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
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
  req.body.user = req.user.id;

  let profile = await Profile.findOne({ user: req.user.id });

  if (profile) {
    return next(
      new ErrorResponse(
        `The user with ID ${req.user.id} has already added profile`,
        400
      )
    );
  }

  profile = await Profile.create(req.body);

  res.status(200).json({
    success: true,
    data: profile,
  });
});

// @route   UPDATE api/v1/profile
// @desc    Update user and profile
// @access  Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
  let profile = await Profile.findOne({ user: req.user.id });

  if (!profile) {
    return next(
      new ErrorResponse(`No profile with the id of ${req.params.id}`),
      404
    );
  }

  profile = await Profile.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: profile,
  });
});

// @route   DELETE api/v1/profile
// @desc    Delete user and profile
// @access  Private
exports.deleteProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOneAndRemove({ user: req.user.id });

  // const user = await User.findOneAndDelete({ _id: req.user.id });

  res.status(200).json({
    success: true,
    data: {},
  });
});
