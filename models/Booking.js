import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    city: { type: String, required: true, trim: true },
    serviceId: { type: String, required: true, trim: true },
    serviceName: { type: String, required: true, trim: true },
    workerId: { type: String, required: true, trim: true },
    workerName: { type: String, required: true, trim: true },
    date: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },
    time: { type: String, required: true },
    address: { type: String, required: true, trim: true, minlength: 5 },
    notes: { type: String, default: '', trim: true },
    status: { 
      type: String, 
      default: 'Booked',
      enum: ['Booked', 'Completed', 'Cancelled']
    }
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
