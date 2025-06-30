require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const recipeRoutes = require("./routes/recipe");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/user", userRoutes);
app.use("/", recipeRoutes);
// Connect to MongoDB with Mongoose
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas with Mongoose"))
  .catch((err) => console.error("Connection error:", err));

// Your other Express middlewares and routes here...

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
