const shoppingController = require("../controllers/shoppingController");

const express = require("express");
const router = express.Router();

// Handle GET request. Display shopping lists
router.get("/", shoppingController.getAllShoppingLists, (req, res) => {
	res.status(200).json(res.locals.shoppingLists);
});

// Handle post to add to shopping list
router.post("/addToShoppingList", shoppingController.addToList, (req, res) => {
	res.status(200).json(res.locals.addedItems);
});

// Handle delete to clear shopping list
router.delete(
	"/clearShoppingList",
	shoppingController.clearShoppingList,
	(req, res) => {
		res.status(200).json("shopping list cleared");
	}
);

// Handle delete to remove recipe from shopping list
router.delete("/removeItem", shoppingController.removeRecipe, (req, res) => {
	res.status(200).json("item removed");
});

module.exports = router;
