import { User } from '../models/User.js';
import { Complaint } from '../models/Complaint.js';
import { WaterSchedule } from '../models/WaterSchedule.js';
import { GarbageSchedule } from '../models/GarbageSchedule.js';

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard/stats
// @access  Private (Admin/Staff)
export const getDashboardStats = async (req, res) => {
  try {
    const totalCitizens = await User.countDocuments({ role: 'citizen' });
    const totalComplaints = await Complaint.countDocuments();
    const pendingComplaints = await Complaint.countDocuments({ status: 'Pending' });
    const inProgressComplaints = await Complaint.countDocuments({ status: 'In Progress' });
    const resolvedComplaints = await Complaint.countDocuments({ status: 'Resolved' });
    const rejectedComplaints = await Complaint.countDocuments({ status: 'Rejected' });
    const totalWaterSchedules = await WaterSchedule.countDocuments();
    const totalGarbageSchedules = await GarbageSchedule.countDocuments();

    res.json({
      success: true,
      data: {
        totalCitizens,
        totalComplaints,
        pendingComplaints,
        inProgressComplaints,
        resolvedComplaints,
        rejectedComplaints,
        totalWaterSchedules,
        totalGarbageSchedules,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get recent complaints for admin dashboard
// @route   GET /api/admin/dashboard/recent-complaints
// @access  Private (Admin/Staff)
export const getRecentComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      count: complaints.length,
      data: complaints,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get complaint category statistics
// @route   GET /api/admin/dashboard/category-stats
// @access  Private (Admin/Staff)
export const getCategoryStats = async (req, res) => {
  try {
    const stats = await Complaint.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          category: '$_id',
          count: 1,
          _id: 0,
        },
      },
    ]);

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get complaint status statistics
// @route   GET /api/admin/dashboard/status-stats
// @access  Private (Admin/Staff)
export const getStatusStats = async (req, res) => {
  try {
    const stats = await Complaint.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          status: '$_id',
          count: 1,
          _id: 0,
        },
      },
    ]);

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
