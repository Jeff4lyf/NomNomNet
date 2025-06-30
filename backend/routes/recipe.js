const express = require("express");
const {
  getAll,
  getUserRecipes,
  createrecipe,
  updaterecipe,
  deleterecipe,
  getrecipe,
} = require("../controllers/recipeControllers");
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

router.use(requireAuth);
router.get("/recipes", getAll);
router.get("/recipe/:id",getrecipe);
router.get("/recipe/user", getUserRecipes);
router.post("/recipe", createrecipe);
router.patch("/recipe/user/:id", updaterecipe);
router.delete("/recipe/user/:id", deleterecipe);

module.exports = router;
