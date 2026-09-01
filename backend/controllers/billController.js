import { Bill } from '../models/Bill.js';

// @desc    Get user's bills
// @route   GET /api/bills
// @access  Private (Citizen)
export const getMyBills = async (req, res) => {
  try {
    const bills = await Bill.find({ userId: req.user._id }).sort({ dueDate: 1 });
    res.json({
      success: true,
      count: bills.length,
      data: bills,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get bill by ID
// @route   GET /api/bills/:id
// @access  Private
export const getBillById = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id).populate('userId', 'name email phone');
    if (!bill) {
      return res.status(404).json({ success: false, message: 'Bill not found' });
    }
    res.json({
      success: true,
      data: bill,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create bill
// @route   POST /api/admin/bills
// @access  Private (Admin)
export const createBill = async (req, res) => {
  try {
    const { userId, billType, propertyNumber, amount, dueDate, paymentStatus } = req.body;

    const bill = await Bill.create({
      userId,
      billType,
      propertyNumber,
      amount,
      dueDate,
      paymentStatus: paymentStatus || 'Due',
    });

    res.status(201).json({
      success: true,
      message: 'Bill generated successfully',
      data: bill,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update bill status / record transaction
// @route   PUT /api/admin/bills/:id
// @access  Private (Admin/User)
export const updateBill = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) {
      return res.status(404).json({ success: false, message: 'Bill not found' });
    }

    const { paymentStatus, transactionId, amount } = req.body;

    if (paymentStatus) bill.paymentStatus = paymentStatus;
    if (transactionId) bill.transactionId = transactionId;
    if (amount) bill.amount = amount;

    await bill.save();

    res.json({
      success: true,
      message: 'Bill updated successfully',
      data: bill,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
