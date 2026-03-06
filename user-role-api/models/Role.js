const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    default: ''
  },
  deletedAt: {
    type: Date,
    default: null
  }
}, { timestamps: true });

// Soft delete method
roleSchema.methods.softDelete = function() {
  this.deletedAt = new Date();
  return this.save();
};

// Static method to find non-deleted roles
roleSchema.statics.findActive = function() {
  return this.find({ deletedAt: null });
};

module.exports = mongoose.model('Role', roleSchema);

