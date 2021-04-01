import React, { Component } from "react";
import RecipesContainer from "./RecipesContainer.js";
import AddRecipePopup from "./AddRecipePopup";
import ShoppingList from "./ShoppingList";
import "../stylesheets/styles.scss";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showPopup: false,
			showEditPopup: false,
			recipe: {},
			recipes: [],
			shoppingLists: [],
		};
		this.togglePopup = this.togglePopup.bind(this);
		this.getRecipes = this.getRecipes.bind(this);
		this.addRecipe = this.addRecipe.bind(this);
		this.deleteRecipe = this.deleteRecipe.bind(this);
		this.loadShoppingList = this.loadShoppingList.bind(this);
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

	addRecipe(title, category, link, ingredients, notes, rating) {
		// split ingredients list by commas
		const ingredientsArray = ingredients.split(",");
		// Default category to Any Market
		if (category === "") {
			category = "Any Market";
		}
		const data = {
			title,
			category,
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

	loadShoppingList() {
		fetch("/shopping/")
			.then((response) => response.json())
			.then((data) => {
				this.setState({ shoppingLists: data });
				console.log("shoppingLists:", this.state.shoppingLists);
			})
			.catch((error) => console.log("Error: ", error));
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
								<label className="inputLabels">Market: </label>
								<input
									id="category"
									className="inputs"
									type="text"
									placeholder="Any Market (default)"
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
										const category = document.getElementById("category").value;
										const link = document.getElementById("link").value;
										const ingredients = document.getElementById("ingredients")
											.value;
										const notes = document.getElementById("notes").value;
										const rating = document.getElementById("rating").value;
										this.addRecipe(
											title,
											category,
											link,
											ingredients,
											notes,
											rating
										);
									}}
								>
									Add
								</button>
							</div>
						}
						handleClose={this.togglePopup}
					/>
				)}

				<div id="mainContent">
					<RecipesContainer
						recipes={this.state.recipes}
						deleteRecipe={this.deleteRecipe}
						getRecipes={this.getRecipes}
						getRecipes={this.getRecipes}
						shoppingList={this.state.shoppingList}
						loadShoppingList={this.loadShoppingList}
					/>

					<ShoppingList
						shoppingLists={this.state.shoppingLists}
						loadShoppingList={this.loadShoppingList}
					/>
				</div>
			</div>
		);
	}
}

export default App;
