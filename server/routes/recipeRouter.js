const recipeController = require("../controllers/recipeController");

const express = require("express");
const router = express.Router();

// Handle GET request. Display recipes
router.get("/", recipeController.getAllRecipes, (req, res) => {
	res.status(200).json(res.locals.recipes);
});

// Handle post request to add recipe
router.post("/addRecipe", recipeController.addRecipe, (req, res) => {
	res.status(200).json(res.locals.newRecipe);
});

// Handle put request to edit recipe
router.put("/editRecipe", recipeController.editRecipe, (req, res) => {
	res.status(200).json(res.locals.editedRecipe);
});

// Handle delete request
router.delete("/deleteRecipe", recipeController.deleteRecipe, (req, res) => {
	res.status(200).json(res.locals.deletedRecipe);
});

module.exports = router;
