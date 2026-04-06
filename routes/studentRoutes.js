const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Create - Add a new student
router.post('/add', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json({ message: 'Student Added', student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read - Get all students
router.get('/view', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read - Get a single student by ID
router.get('/view/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update - Update a student by ID
router.put('/update/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student Updated', student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete - Delete a student by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student Deleted', student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
