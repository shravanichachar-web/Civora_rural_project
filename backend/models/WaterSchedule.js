import mongoose from 'mongoose';

const waterScheduleSchema = new mongoose.Schema(
  {
    area: {
      type: String,
      required: [true, 'Area is required'],
      trim: true,
    },
    date: {
      type: String,
      default: '',
    },
    startTime: {
      type: String,
      required: [true, 'Start time is required'],
    },
    endTime: {
      type: String,
      required: [true, 'End time is required'],
    },
    status: {
      type: String,
      enum: ['Active', 'Delayed', 'Maintenance', 'Scheduled', 'Off'],
      default: 'Active',
    },
    announcement: {
      type: String,
      default: '',
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

export const WaterSchedule = mongoose.model('WaterSchedule', waterScheduleSchema);
