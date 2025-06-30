const Recipe = require("../models/recipeModel");
const mongoose = require("mongoose");

const getAll = async (req, res) => {
  const recipes = await Recipe.find({}).sort({ createdAt: -1 });
  res.status(200).json(recipes);
};
const getUserRecipes = async (req, res) => {
  const user_id = req.user._id;
  const userRecipes = await Recipe.find({ user_id }).sort({ createdAt: -1 });
  if (!userRecipes) {
    return res.status(400).json({ error: "No recipes!" });
  }
  res.status(200).json(userRecipes);
};
const getrecipe = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Recipe exists" });
  }
  const recipe = await Recipe.findById(id);
  if (!recipe) return res.status(400).json({ error: "No such Recipe exists" });
  res.status(200).json(recipe);
};
const createrecipe = async (req, res) => {
  let emptyFields = [];
  const { title, image, description, ingredients, steps, prepTime } = req.body;
  if (!title) emptyFields.push("title");
  if (!image) emptyFields.push("image");
  if (!description) emptyFields.push("description");
  if (!ingredients) emptyFields.push("ingredients");
  if (!steps) emptyFields.push("steps");
  if (!prepTime) emptyFields.push("prepTime");
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }
  try {
    const user_id = req.user._id;
    const recipe = await Recipe.create({
      title,
      image,
      description,
      ingredients,
      steps,
      prepTime,
      user_id,
    });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const updaterecipe = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such recipe exists" });
  }
  const recipe = await Recipe.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!recipe) return res.status(400).json({ error: "No such recipe exists" });
  res.status(200).json(recipe);
};
const deleterecipe = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such recipe exists" });
  }
  const recipe = await Recipe.findOneAndDelete({ _id: id });
  if (!recipe) return res.status(404).json({ error: "No such recipe" });
  res.status(200).json(recipe);
};

module.exports = {
  getAll,
  getUserRecipes,
  createrecipe,
  updaterecipe,
  deleterecipe,
  getrecipe,
};
