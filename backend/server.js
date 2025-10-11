require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ngoRoutes = require('./routes/ngos');
const taskRoutes = require("./routes/tasks");
const overviewRoutes = require('./routes/overview');
const bankAccountRoutes = require("./routes/bankAccount");
const authRoutes = require('./routes/auth');

const app = express();

const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes registration
app.use('/ngos', ngoRoutes);
app.use("/tasks", taskRoutes);
app.use('/overview', overviewRoutes);
app.use("/bank-account", bankAccountRoutes)
app.use('/api/auth', authRoutes);
// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
