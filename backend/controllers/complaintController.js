import { Complaint } from '../models/Complaint.js';
import { uploadToCloudinary } from '../services/cloudinaryService.js';

// @desc    Create new complaint
// @route   POST /api/complaints
// @access  Private (Citizen)
export const createComplaint = async (req, res) => {
  try {
    const { title, description, category, location, latitude, longitude, priority } = req.body;

    let imageUrl = '';
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer, 'civora_complaints');
    }

    const complaint = await Complaint.create({
      userId: req.user._id,
      title,
      description,
      category,
      location,
      latitude: latitude ? parseFloat(latitude) : null,
      longitude: longitude ? parseFloat(longitude) : null,
      priority: priority || 'Medium',
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      message: 'Complaint submitted successfully',
      data: complaint,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get logged in user's complaints
// @route   GET /api/complaints/my
// @access  Private (Citizen)
export const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: complaints.length,
      data: complaints,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single complaint by ID
// @route   GET /api/complaints/:id
// @access  Private
export const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('userId', 'name email phone')
      .populate('assignedTo', 'name email phone role');

    if (!complaint) {
      return res.status(404).json({ success: false, message: 'Complaint not found' });
    }

    res.json({
      success: true,
      data: complaint,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all complaints (Admin/Staff filterable)
// @route   GET /api/admin/complaints
// @access  Private (Admin/Staff)
export const getAllComplaints = async (req, res) => {
  try {
    const { status, category, priority, search } = req.query;
    let query = {};

    if (status) query.status = status;
    if (category) query.category = category;
    if (priority) query.priority = priority;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { referenceNo: { $regex: search, $options: 'i' } },
      ];
    }

    const complaints = await Complaint.find(query)
      .populate('userId', 'name email phone address')
      .populate('assignedTo', 'name email phone role')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: complaints.length,
      data: complaints,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update complaint status & admin remark
// @route   PUT /api/admin/complaints/:id/status
// @access  Private (Admin/Staff)
export const updateComplaintStatus = async (req, res) => {
  try {
    const { status, adminRemark } = req.body;

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ success: false, message: 'Complaint not found' });
    }

    if (status) complaint.status = status;
    if (adminRemark !== undefined) complaint.adminRemark = adminRemark;

    await complaint.save();

    res.json({
      success: true,
      message: `Complaint status updated to ${status}`,
      data: complaint,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Assign staff to complaint
// @route   PUT /api/admin/complaints/:id/assign
// @access  Private (Admin)
export const assignStaffToComplaint = async (req, res) => {
  try {
    const { staffId } = req.body;

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ success: false, message: 'Complaint not found' });
    }

    complaint.assignedTo = staffId;
    if (complaint.status === 'Pending') {
      complaint.status = 'In Progress';
    }

    await complaint.save();

    res.json({
      success: true,
      message: 'Staff assigned successfully',
      data: complaint,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete complaint
// @route   DELETE /api/admin/complaints/:id
// @access  Private (Admin)
export const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ success: false, message: 'Complaint not found' });
    }

    await complaint.deleteOne();

    res.json({
      success: true,
      message: 'Complaint deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
