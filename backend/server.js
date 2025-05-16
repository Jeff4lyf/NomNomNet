require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB with Mongoose
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas with Mongoose"))
  .catch((err) => console.error("Connection error:", err));



// Your other Express middlewares and routes here...

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

