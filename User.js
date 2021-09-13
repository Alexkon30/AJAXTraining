import mongoose from 'mongoose';

const User = new mongoose.Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateOfRegistration: { type: String },
  birthday: { type: String, default: '' },
  name: { type: String, default: '' },
  surname: { type: String, default: '' },
  age: { type: Number }
}, { versionKey: false })


export default mongoose.model('User', User);
