const express = require("express");
const app = express();
const path = require("path");
const recipeRouter = require("./routes/recipeRouter");

const PORT = 3001;

// handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// define route handlers
app.use("/recipes", recipeRouter);

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
