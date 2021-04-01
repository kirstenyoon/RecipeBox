const mongoose = require("mongoose");
require("dotenv").config();

mongoose
	.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oxti2.mongodb.net/recipeCollectorDB?retryWrites=true&w=majority`,
		{
			// options for the connect method to parse the URI
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			// sets the name of the DB that our collections are part of
			dbName: "recipeCollectorDB",
		}
	)
	.then(() => console.log("Connected to Mongo DB."))
	.catch((err) => console.log(err));

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

// Export models
module.exports = {
	Recipe,
};
