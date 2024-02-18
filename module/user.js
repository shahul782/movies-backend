
import mongoose from 'mongoose';

const userSchema =  new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, },
  location: { type: String,  },
  date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
export default User;