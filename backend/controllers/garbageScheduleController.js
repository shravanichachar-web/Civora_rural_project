import { GarbageSchedule } from '../models/GarbageSchedule.js';

// @desc    Get all garbage schedules
// @route   GET /api/garbage-schedule
// @access  Public / Citizen
export const getGarbageSchedules = async (req, res) => {
  try {
    const { area } = req.query;
    let query = {};
    if (area) {
      query.area = { $regex: area, $options: 'i' };
    }

    const schedules = await GarbageSchedule.find(query).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: schedules.length,
      data: schedules,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create garbage schedule
// @route   POST /api/admin/garbage-schedule
// @access  Private (Admin)
export const createGarbageSchedule = async (req, res) => {
  try {
    const { area, collectionTime, vehicleNumber, driverName, status } = req.body;

    const schedule = await GarbageSchedule.create({
      area,
      collectionTime,
      vehicleNumber,
      driverName: driverName || '',
      status: status || 'Scheduled',
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: 'Garbage schedule created successfully',
      data: schedule,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update garbage schedule
// @route   PUT /api/admin/garbage-schedule/:id
// @access  Private (Admin)
export const updateGarbageSchedule = async (req, res) => {
  try {
    const schedule = await GarbageSchedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ success: false, message: 'Garbage schedule not found' });
    }

    const { area, collectionTime, vehicleNumber, driverName, status } = req.body;

    if (area) schedule.area = area;
    if (collectionTime) schedule.collectionTime = collectionTime;
    if (vehicleNumber) schedule.vehicleNumber = vehicleNumber;
    if (driverName !== undefined) schedule.driverName = driverName;
    if (status) schedule.status = status;

    await schedule.save();

    res.json({
      success: true,
      message: 'Garbage schedule updated successfully',
      data: schedule,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete garbage schedule
// @route   DELETE /api/admin/garbage-schedule/:id
// @access  Private (Admin)
export const deleteGarbageSchedule = async (req, res) => {
  try {
    const schedule = await GarbageSchedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ success: false, message: 'Garbage schedule not found' });
    }

    await schedule.deleteOne();

    res.json({
      success: true,
      message: 'Garbage schedule deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
