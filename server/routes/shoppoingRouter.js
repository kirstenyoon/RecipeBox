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

// // Handle delete group from shopping list
// router.delete("/addToShoppingList", shoppingController.deleteGroup, (req, res) => {
// 	res.status(200).json('group deleted');
// });

module.exports = router;
