import React, { Component } from "react";
import RecipesContainer from "./RecipesContainer.js";
import AddRecipePopup from "./AddRecipePopup";
import "../stylesheets/styles.scss";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showPopup: false,
			recipe: {},
			recipes: [],
		};
		this.togglePopup = this.togglePopup.bind(this);
		this.getRecipes = this.getRecipes.bind(this);
		this.addRecipe = this.addRecipe.bind(this);
		this.deleteRecipe = this.deleteRecipe.bind(this);
	}

	togglePopup() {
		this.setState({
			showPopup: !this.state.showPopup,
		});
	}

	getRecipes() {
		fetch("/recipes/")
			.then((response) => response.json())
			.then((data) => {
				this.setState({ recipes: data });
			})
			.catch((error) => console.log("Error: ", error));
	}

	addRecipe(title, link, ingredients, notes, rating) {
		// split ingredients list by commas
		const ingredientsArray = ingredients.split(",");
		const data = {
			title,
			link,
			ingredients: ingredientsArray,
			notes,
			rating,
		};
		fetch("/recipes/addRecipe", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => {
				this.togglePopup();
				this.getRecipes();
			})
			.catch((err) => console.log("addRecipe ERROR:", err));
	}

	deleteRecipe(id) {
		const data = { _id: id };
		fetch("/recipes/deleteRecipe", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => {
				this.getRecipes();
			})
			.catch((err) => console.log("deleteRecipe ERROR: ", err));
	}

	componentDidMount() {
		this.getRecipes();
	}

	render() {
		return (
			<div>
				<button onClick={this.togglePopup}>Add Recipe</button>

				{this.state.showPopup && (
					<AddRecipePopup
						content={
							<div className="addRecipePopup">
								<b>Add Recipe</b>
								<p></p>
								<label>Title: </label>
								<input id="title" type="text" value={this.state.title}></input>
								<label>Link: </label>
								<input id="link" type="text" value={this.state.link}></input>
								<label>Ingredients: </label>
								<input
									id="ingredients"
									type="text"
									value={this.state.ingredients}
								></input>
								<label>Notes: </label>
								<input id="notes" type="text" value={this.state.notes}></input>
								<label>Rating: </label>
								<input
									id="rating"
									type="text"
									value={this.state.rating}
								></input>
								<p></p>
								<button
									onClick={() => {
										const title = document.getElementById("title").value;
										const link = document.getElementById("link").value;
										const ingredients = document.getElementById("ingredients")
											.value;
										const notes = document.getElementById("notes").value;
										const rating = document.getElementById("rating").value;
										this.addRecipe(title, link, ingredients, notes, rating);
									}}
								>
									Add
								</button>
							</div>
						}
						handleClose={this.togglePopup}
					/>
				)}

				<RecipesContainer
					deleteRecipe={this.deleteRecipe}
					recipes={this.state.recipes}
				/>
			</div>
		);
	}
}

export default App;
