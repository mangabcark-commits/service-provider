import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2 },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    password: { type: String, required: true, minlength: 6 },
    city: { type: String, default: '', trim: true }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
