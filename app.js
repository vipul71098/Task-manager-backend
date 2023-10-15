// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));



// Routes
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const issueRoutes = require('./routes/issueRoutes');
const commentRoutes = require('./routes/commentRoutes');
const adminauthRoutes = require('./routes/adminauthRoute');
// const attachmentRoutes = require('./routes/attachmentRoutes');
// const projectMemberRoutes = require('./routes/projectMemberRoutes');
// const issueHistoryRoutes = require('./routes/issueHistoryRoutes');
// const inventoryRoutes = require('./routes/inventoryRoutes');

app.use('/users', userRoutes);
app.use('/project', projectRoutes);
app.use('/issues', issueRoutes);
app.use('/comments', commentRoutes);
app.use('/auth', adminauthRoutes);

// Use routes for other entities

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
