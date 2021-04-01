const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create recipe schema
const recipeSchema = new Schema({
	title: { type: String, required: true },
	category: { type: String, default: "Any Market" },
	link: String,
	ingredients: [
		{
			type: String,
		},
	],
	notes: String,
	rating: Number,
});
// Create recipe model
const Recipe = mongoose.model("recipe", recipeSchema);

// // Shopping list schema
// const shoppingListSchema = new Schema({
// 	market: String,
// 	ingredients: [{ type: String }],
// });
// const ShoppingList = mongoose.model("shoppingList", shoppingListSchema);

// Export models
module.exports = {
	Recipe,
	// ShoppingList,
};
