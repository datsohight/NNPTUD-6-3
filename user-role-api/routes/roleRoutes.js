const express = require('express');
const router = express.Router();
const Role = require('../models/Role');

// CREATE - Create new role
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }
    
    const role = new Role({
      name,
      description
    });
    
    const savedRole = await role.save();
    res.status(201).json(savedRole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ - Get all roles (excluding soft deleted)
router.get('/', async (req, res) => {
  try {
    const roles = await Role.find({ deletedAt: null });
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ - Get role by ID
router.get('/:id', async (req, res) => {
  try {
    const role = await Role.findOne({ _id: req.params.id, deletedAt: null });
    
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE - Update role by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, description } = req.body;
    
    const role = await Role.findOneAndUpdate(
      { _id: req.params.id, deletedAt: null },
      { name, description },
      { new: true, runValidators: true }
    );
    
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    
    res.json(role);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE (Soft Delete) - Soft delete role by ID
router.delete('/:id', async (req, res) => {
  try {
    const role = await Role.findOne({ _id: req.params.id, deletedAt: null });
    
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    
    await role.softDelete();
    res.json({ message: 'Role soft deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

