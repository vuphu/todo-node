import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: 'events',
  },
);
EventSchema.index({ name: 'text' });

export default mongoose.model('Event', EventSchema);
