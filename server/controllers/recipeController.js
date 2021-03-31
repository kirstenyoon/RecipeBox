const models = require("../models/recipeModels");

const recipeController = {};

recipeController.getAllRecipes = (req, res, next) => {
	models.Recipe.find({}, (err, recipes) => {
		if (err) {
			next(err);
		}
		res.locals.recipes = recipes;
		next();
	});
};

recipeController.addRecipe = (req, res, next) => {
	const { title, category, link, ingredients, notes, rating } = req.body;
	// Create instance of Recipe model, passing in data from request body
	models.Recipe.create(
		{ title, category, link, ingredients, notes, rating },
		(err, newRecipe) => {
			// If there's an error, invoke next and send to global error handler
			if (err) {
				next(err);
			}
			res.locals.newRecipe = newRecipe;
			next();
		}
	);
};

recipeController.updateRating = (req, res, next) => {
	// const id = req.params.id;
	const { rating, _id } = req.body;
	models.Recipe.findOneAndUpdate(
		{ _id },
		{ rating },
		{ new: true },
		(err, updatedRating) => {
			if (err) {
				next(err);
			}
			res.locals.updatedRating = updatedRating;
			next();
		}
	);
};

recipeController.deleteRecipe = (req, res, next) => {
	const { _id } = req.body;
	models.Recipe.findOneAndDelete({ _id }, (err, deletedRecipe) => {
		if (err) {
			next(err);
		}
		res.locals.deletedRecipe = deletedRecipe;
		next();
	});
};

module.exports = recipeController;
