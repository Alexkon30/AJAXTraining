import mongoose from 'mongoose';

const Message = new mongoose.Schema({
  author: String,
  authorId: String,
  dialogId: String,
  date: String,
  text: { type: String, default: '' }
}, { versionKey: false })


export default mongoose.model('Message', Message);
