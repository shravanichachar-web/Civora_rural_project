import mongoose from 'mongoose';

const garbageScheduleSchema = new mongoose.Schema(
  {
    area: {
      type: String,
      required: [true, 'Area is required'],
      trim: true,
    },
    collectionTime: {
      type: String,
      required: [true, 'Collection time is required'],
    },
    vehicleNumber: {
      type: String,
      required: [true, 'Vehicle number is required'],
    },
    driverName: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['On Route', 'Completed', 'Delayed', 'Scheduled'],
      default: 'Scheduled',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const GarbageSchedule = mongoose.model('GarbageSchedule', garbageScheduleSchema);
