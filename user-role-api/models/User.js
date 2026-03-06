const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    default: ''
  },
  avatarUrl: {
    type: String,
    default: 'https://i.sstatic.net/l60Hf.png'
  },
  status: {
    type: Boolean,
    default: false
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  },
  loginCount: {
    type: Number,
    default: 0,
    min: 0
  },
  deletedAt: {
    type: Date,
    default: null
  }
}, { timestamps: true });

// Soft delete method
userSchema.methods.softDelete = function() {
  this.deletedAt = new Date();
  return this.save();
};

// Static method to find non-deleted users
userSchema.statics.findActive = function() {
  return this.find({ deletedAt: null });
};

module.exports = mongoose.model('User', userSchema);

