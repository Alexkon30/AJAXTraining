import mongoose from 'mongoose';
import nanoid from 'nanoid';

const Dialog = new mongoose.Schema({
  users: [String],
  id: { type: String, default: nanoid() }
}, { versionKey: false })


export default mongoose.model('Dialog', Dialog);
