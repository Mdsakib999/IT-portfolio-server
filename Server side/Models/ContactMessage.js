import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    responded: { type: Boolean, default: false },
});
const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);
export default ContactMessage;
