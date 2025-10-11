const mongoose = require('mongoose');

const ngoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  contact_info: String,
  status: { type: String, enum: ['Available', 'Busy', 'Unavailable'], default: 'Available' },
  tasks_done: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  last_active_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Ngo', ngoSchema);
