import mongoose from 'mongoose';

const Dialog = new mongoose.Schema({
  users: [String],
  id: String
}, { versionKey: false })


export default mongoose.model('Dialog', Dialog);
