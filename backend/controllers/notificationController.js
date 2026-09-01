import { Notification } from '../models/Notification.js';

// @desc    Get user notifications & broadcast notifications
// @route   GET /api/notifications
// @access  Private (Citizen)
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      $or: [{ userId: req.user._id }, { userId: null }],
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private (Citizen)
export const markNotificationRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    notification.isRead = true;
    await notification.save();

    res.json({
      success: true,
      message: 'Notification marked as read',
      data: notification,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create notification
// @route   POST /api/admin/notifications
// @access  Private (Admin)
export const createNotification = async (req, res) => {
  try {
    const { userId, title, message, type } = req.body;

    const notification = await Notification.create({
      userId: userId || null,
      title,
      message,
      type: type || 'announcement',
    });

    res.status(201).json({
      success: true,
      message: 'Notification created successfully',
      data: notification,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
