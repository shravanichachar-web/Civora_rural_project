import { Feedback } from '../models/Feedback.js';

// @desc    Submit user feedback
// @route   POST /api/feedback
// @access  Private (Citizen)
export const createFeedback = async (req, res) => {
  try {
    const { rating, message } = req.body;

    const feedback = await Feedback.create({
      userId: req.user._id,
      rating,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      data: feedback,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all feedback
// @route   GET /api/feedback
// @access  Public / Admin
export const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate('userId', 'name email profileImage')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: feedbacks.length,
      data: feedbacks,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
