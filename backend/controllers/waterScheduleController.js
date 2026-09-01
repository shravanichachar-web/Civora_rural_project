import { WaterSchedule } from '../models/WaterSchedule.js';

// @desc    Get all water schedules
// @route   GET /api/water-schedule
// @access  Public / Citizen
export const getWaterSchedules = async (req, res) => {
  try {
    const { area } = req.query;
    let query = {};
    if (area) {
      query.area = { $regex: area, $options: 'i' };
    }

    const schedules = await WaterSchedule.find(query).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: schedules.length,
      data: schedules,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create water schedule
// @route   POST /api/admin/water-schedule
// @access  Private (Admin)
export const createWaterSchedule = async (req, res) => {
  try {
    const { area, date, startTime, endTime, status, announcement } = req.body;

    const schedule = await WaterSchedule.create({
      area,
      date: date || new Date().toISOString().split('T')[0],
      startTime,
      endTime,
      status: status || 'Active',
      announcement: announcement || '',
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: 'Water schedule created successfully',
      data: schedule,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update water schedule
// @route   PUT /api/admin/water-schedule/:id
// @access  Private (Admin)
export const updateWaterSchedule = async (req, res) => {
  try {
    const schedule = await WaterSchedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ success: false, message: 'Water schedule not found' });
    }

    const { area, date, startTime, endTime, status, announcement } = req.body;

    if (area) schedule.area = area;
    if (date) schedule.date = date;
    if (startTime) schedule.startTime = startTime;
    if (endTime) schedule.endTime = endTime;
    if (status) schedule.status = status;
    if (announcement !== undefined) schedule.announcement = announcement;

    await schedule.save();

    res.json({
      success: true,
      message: 'Water schedule updated successfully',
      data: schedule,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete water schedule
// @route   DELETE /api/admin/water-schedule/:id
// @access  Private (Admin)
export const deleteWaterSchedule = async (req, res) => {
  try {
    const schedule = await WaterSchedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ success: false, message: 'Water schedule not found' });
    }

    await schedule.deleteOne();

    res.json({
      success: true,
      message: 'Water schedule deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
