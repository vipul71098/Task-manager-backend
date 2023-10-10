const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  Username: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  FirstName: String,
  LastName: String,
  Role: { type: String, enum: ['Admin', 'Developer', 'QA', 'Other'], required: true },
});



const User = mongoose.model('User', userSchema);

module.exports = userSchema;