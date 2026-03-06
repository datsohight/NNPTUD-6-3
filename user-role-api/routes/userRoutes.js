const express = require('express');
const router = express.Router();
const User = require('../models/User');

// CREATE - Create new user
router.post('/', async (req, res) => {
  try {
    const { username, password, email, fullName, avatarUrl, status, role, loginCount } = req.body;
    
    const user = new User({
      username,
      password,
      email,
      fullName,
      avatarUrl,
      status,
      role,
      loginCount
    });
    
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ - Get all users (excluding soft deleted)
router.get('/', async (req, res) => {
  try {
    const users = await User.find({ deletedAt: null }).populate('role');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ - Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id, deletedAt: null }).populate('role');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE - Update user by ID
router.put('/:id', async (req, res) => {
  try {
    const { fullName, avatarUrl, status, role, loginCount } = req.body;
    
    const user = await User.findOneAndUpdate(
      { _id: req.params.id, deletedAt: null },
      { fullName, avatarUrl, status, role, loginCount },
      { new: true, runValidators: true }
    ).populate('role');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE (Soft Delete) - Soft delete user by ID
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id, deletedAt: null });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    await user.softDelete();
    res.json({ message: 'User soft deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /enable - Enable user (set status to true)
router.post('/enable', async (req, res) => {
  try {
    const { email, username } = req.body;
    
    if (!email || !username) {
      return res.status(400).json({ message: 'Email and username are required' });
    }
    
    const user = await User.findOne({ email, username, deletedAt: null });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found with provided email and username' });
    }
    
    user.status = true;
    await user.save();
    
    res.json({ message: 'User enabled successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /disable - Disable user (set status to false)
router.post('/disable', async (req, res) => {
  try {
    const { email, username } = req.body;
    
    if (!email || !username) {
      return res.status(400).json({ message: 'Email and username are required' });
    }
    
    const user = await User.findOne({ email, username, deletedAt: null });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found with provided email and username' });
    }
    
    user.status = false;
    await user.save();
    
    res.json({ message: 'User disabled successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

