const mongoose = require('mongoose');
const { Schema } = mongoose;

const notificationSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  plant_id: { type: Schema.Types.ObjectId, ref: 'Plant', required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Notification', notificationSchema);
