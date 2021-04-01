const express = require("express");
const app = express();
const path = require("path");
const recipeRouter = require("./routes/recipeRouter");
const shoppingRouter = require("./routes/shoppoingRouter");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = 3001;

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

// handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// define route handlers
app.use("/recipes", recipeRouter);
app.use("/shopping", shoppingRouter);

// handle requests for static files
// if (process.env.NODE_ENV === "production") {
// statically serve everything in the build folder on the route '/build'
app.use("/build", express.static(path.join(__dirname, "../build")));
// serve index.html on the route '/'
app.get("/", (req, res) => {
	return res.status(200).sendFile(path.join(__dirname, "../index.html"));
});
// }

// catch-all route handler for any requests to an unknown route
app.use((req, res) =>
	res.status(404).send("This is not the page you're looking for...")
);

// global error handler
app.use((err, req, res, next) => {
	const defaultErr = {
		log: "Express error handler caught unknown middleware error",
		status: 500,
		message: { err: "An error occurred" },
	};
	const errorObj = Object.assign({}, defaultErr, err);
	return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
