const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

exports.login = async (req, res) => {
  // Validate request body
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    
    // Check if admin exists
    if (!admin) {
      return res.status(401).json({ message: 'No admin found with this email address' });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Sign and send token
    const token = jwt.sign({ adminId: admin._id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
    res.json({ token });
    
  } catch (error) {
    // Check for specific error types (like database errors) if necessary

    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }

    // Fallback to a general server error
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



exports.signup = async (req, res) => {
  const { email, password } = req.body;

  // Validation: Basic checks for email and password
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
  }

  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists with this email.' });
    }

    // Create a new admin
    const admin = new Admin({ email, password });
    await admin.save();
    
    res.status(201).json({ message: 'Admin created successfully.' });
    
  } catch (error) {
    if (error.name === 'ValidationError') {
      // This will capture any validation errors from Mongoose schema
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ errors: messages });
    }
    res.status(500).json({ message: 'Server error.' });
  }
};
