import mongoose from 'mongoose';

const billSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    billType: {
      type: String,
      required: [true, 'Bill type is required'],
    },
    propertyNumber: {
      type: String,
      required: [true, 'Property / Account number is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required'],
    },
    paymentStatus: {
      type: String,
      enum: ['Due', 'Pending', 'Paid', 'Overdue'],
      default: 'Due',
    },
    transactionId: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const Bill = mongoose.model('Bill', billSchema);
