import mongoose from 'mongoose';

const Message = new mongoose.Schema({
  authorId: String,
  dialogId: String,
  date: { type: Date, default: Date.now() },
  text: { type: String, default: '' }
}, { versionKey: false })


export default mongoose.model('Message', Message);
