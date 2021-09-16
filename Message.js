import mongoose from 'mongoose';

const Message = new mongoose.Schema({
  author: String,
  dialogId: String,
  time: String,
  text: { type: String, default: '' }
}, { versionKey: false })


export default mongoose.model('Message', Message);
