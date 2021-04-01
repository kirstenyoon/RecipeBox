import React, { Component } from "react";

class Recipe extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rating: -1,
		};
	}

	render() {
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
						x
					</button>
				</div>
				<p className="ingredientsLabel">Ingredients</p>
				<p className="ingredientItems">{this.props.recipe.ingredients}</p>
				<div className="ratingLine">
					<label className="rating">Rating:</label>
					{this.props.recipe.rating && <p>{this.props.recipe.rating}</p>}
					{!this.props.recipe.rating && (
						<div>
							<input
								type="text"
								id="ratingInput"
								className="ratingInput"
							></input>
							<button
								onClick={() => {
									const rating = document.getElementById("ratingInput").value;
									this.props.updateRating(this.props.recipe._id, rating);
								}}
							>
								Submit
							</button>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default Recipe;
