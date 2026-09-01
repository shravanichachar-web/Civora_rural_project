import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    referenceNo: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
      required: [true, 'Complaint title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Complaint description is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    image: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    latitude: {
      type: Number,
      default: null,
    },
    longitude: {
      type: Number,
      default: null,
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Resolved', 'Rejected'],
      default: 'Pending',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Emergency'],
      default: 'Medium',
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    adminRemark: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate referenceNo before saving if not present
complaintSchema.pre('save', function (next) {
  if (!this.referenceNo) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    this.referenceNo = `CMP${Date.now().toString().slice(-4)}${randomSuffix}`;
  }
  next();
});

export const Complaint = mongoose.model('Complaint', complaintSchema);
