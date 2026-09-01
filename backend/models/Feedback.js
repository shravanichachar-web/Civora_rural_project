import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5,
    },
    message: {
      type: String,
      required: [true, 'Feedback message is required'],
    },
  },
  {
    timestamps: true,
  }
);

export const Feedback = mongoose.model('Feedback', feedbackSchema);
