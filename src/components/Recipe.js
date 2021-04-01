import React, { Component } from "react";
import EditRecipePopup from "./EditRecipePopup";

class Recipe extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rating: -1,
			showEditPopup: false,
		};
		this.toggleEditPopup = this.toggleEditPopup.bind(this);
		this.editRecipe = this.editRecipe.bind(this);
		this.addToList = this.addToList.bind(this);
	}

	toggleEditPopup() {
		this.setState({
			showEditPopup: !this.state.showEditPopup,
		});
	}

	editRecipe(id, title, category, link, ingredients, notes, rating) {
		// split ingredients list by commas
		const ingredientsArray = ingredients.split(",");
		const data = {
			_id: id,
			title,
			category,
			link,
			ingredients: ingredientsArray,
			notes,
			rating,
		};
		fetch("/recipes/editRecipe", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => {
				this.toggleEditPopup();
				this.props.getRecipes();
			})
			.catch((err) => console.log("editRecipe ERROR: ", err));
	}

	addToList(id, category, ingredients) {
		const data = {
			market: category,
			ingredients,
		};

		fetch("/shopping/addToShoppingList", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => {
				this.props.loadShoppingList();
			})
			.catch((err) => console.log("addToList ERROR:", err));
	}

	render() {
		const ingredientList = [];
		for (let i = 0; i < this.props.recipe.ingredients.length; i++) {
			ingredientList.push(
				<Ingredient
					key={"ingredient" + i}
					ingredient={this.props.recipe.ingredients[i]}
				/>
			);
		}

		return (
			<div className="recipes">
				<div className="recipeHeader">
					<div className="recipeHeaderText">
						<p className="recipeTitles">{this.props.recipe.title}</p>
						{/* Add link if exists */}
						{this.props.recipe.link && (
							<a
								className="recipeLinks"
								href={this.props.recipe.link}
								target="_blank"
							>
								link
							</a>
						)}
					</div>
					<button
						onClick={() => {
							this.props.deleteRecipe(this.props.recipe._id);
						}}
						className="deleteRecipeButton"
					>
						X
					</button>
				</div>
				{this.props.recipe.ingredients && (
					<p className="ingredientsLabel">Ingredients</p>
				)}
				<ul className="ingredientLists">{ingredientList}</ul>

				{this.props.recipe.notes && (
					<label className="notesLabel">Notes:</label>
				)}
				<p className="notes">{this.props.recipe.notes}</p>

				<div className="ratingLine">
					{this.props.recipe.rating && (
						<label className="rating">Rating:</label>
					)}
					<p>{this.props.recipe.rating}</p>
				</div>

				<div className="recipeCardButtons">
					<button
						className="editButton"
						onClick={() => {
							this.toggleEditPopup();
						}}
					>
						Edit
					</button>
					{this.state.showEditPopup && (
						<EditRecipePopup
							content={
								<div className="editRecipePopup">
									<b id="inputTitle">Edit Recipe</b>
									<p></p>
									<label className="inputLabels">Title: </label>
									<input
										id="title"
										className="inputs"
										type="text"
										defaultValue={this.props.recipe.title}
										placeholder="required"
									></input>
									<label className="inputLabels">Market: </label>
									<input
										id="category"
										className="inputs"
										type="text"
										defaultValue={this.props.recipe.category}
										placeholder="Any Market (default)"
									></input>
									<label className="inputLabels">Link: </label>
									<input
										id="link"
										className="inputs"
										type="text"
										defaultValue={this.props.recipe.link}
									></input>
									<label className="inputLabels">Ingredients: </label>
									<input
										id="ingredients"
										className="inputs"
										type="text"
										placeholder="separate ingredients by commas"
										defaultValue={this.props.recipe.ingredients}
									></input>
									<label className="inputLabels">Notes: </label>
									<input
										id="notes"
										className="inputs"
										type="text"
										defaultValue={this.props.recipe.notes}
									></input>
									<label className="inputLabels">Rating: </label>
									<input
										id="rating"
										className="inputs"
										type="text"
										defaultValue={this.props.recipe.rating}
									></input>
									<p></p>
									<button
										onClick={() => {
											const title = document.getElementById("title").value;
											const category = document.getElementById("category")
												.value;
											const link = document.getElementById("link").value;
											const ingredients = document.getElementById("ingredients")
												.value;
											const notes = document.getElementById("notes").value;
											const rating = document.getElementById("rating").value;
											this.editRecipe(
												this.props.recipe._id,
												title,
												category,
												link,
												ingredients,
												notes,
												rating
											);
										}}
									>
										Update
									</button>
								</div>
							}
							handleClose={this.toggleEditPopup}
						/>
					)}
					<button
						className="addButton"
						onClick={() => {
							this.addToList(
								this.props.recipe._id,
								this.props.recipe.category,
								this.props.recipe.ingredients
							);
							this.props.getRecipes();
						}}
					>
						Add To List
					</button>
				</div>
			</div>
		);
	}
}

function Ingredient(props) {
	return <li className="ingredients">{props.ingredient}</li>;
}

export default Recipe;
