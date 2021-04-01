const models = require("../models/recipeModels");

const shoppingController = {};

shoppingController.getAllShoppingLists = (req, res, next) => {
	models.ShoppingList.find({}, (err, shoppingLists) => {
		if (err) {
			next(err);
		}
		res.locals.shoppingLists = shoppingLists;
		next();
	});
};

shoppingController.addToList = (req, res, next) => {
	const { market, ingredients } = req.body;
	models.ShoppingList.create({ market, ingredients }, (err, addedItems) => {
		if (err) {
			next(err);
		}
		res.locals.addedItems = addedItems;
		next();
	});
};

shoppingController.clearShoppingList = (req, res, next) => {
	models.ShoppingList.deleteMany({}, (err) => {
		if (err) {
			next(err);
		}
		next();
	});
};

module.exports = shoppingController;
