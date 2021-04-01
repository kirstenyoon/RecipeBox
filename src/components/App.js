import React, { Component } from "react";
import axios from "axios";
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
		this.updateRating = this.updateRating.bind(this);
	}

	componentDidMount() {
		this.getRecipes();
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

	updateRating(id, rating) {
		const data = { _id: id, rating };

		fetch("/recipes/updateRating", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => {
				this.getRecipes();
			})
			.catch((err) => console.log("updateRating ERROR: ", err));
	}

	render() {
		return (
			// Add Recipe Popup Div
			<div>
				<button id="addRecipeButton" onClick={this.togglePopup}>
					Add Recipe
				</button>
				{this.state.showPopup && (
					<AddRecipePopup
						content={
							<div className="addRecipePopup">
								<b id="inputTitle">Add Recipe</b>
								<p></p>
								<label className="inputLabels">Title: </label>
								<input
									id="title"
									className="inputs"
									type="text"
									placeholder="required"
								></input>
								<label className="inputLabels">Link: </label>
								<input id="link" className="inputs" type="text"></input>
								<label className="inputLabels">Ingredients: </label>
								<input
									id="ingredients"
									className="inputs"
									type="text"
									placeholder="separate ingredients by commas"
								></input>
								<label className="inputLabels">Notes: </label>
								<input id="notes" className="inputs" type="text"></input>
								<label className="inputLabels">Rating: </label>
								<input id="rating" className="inputs" type="text"></input>
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
					recipes={this.state.recipes}
					deleteRecipe={this.deleteRecipe}
					updateRating={this.updateRating}
				/>
			</div>
		);
	}
}

export default App;
