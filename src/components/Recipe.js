import React, { Component } from "react";

class Recipe extends Component {
	render() {
		// const ingredientList = [];
		// for (let i = 0; i < this.props.recipe.ingredients; i++) {
		// 	// ingredientList.push(<IngredientItem />);
		// 	ingredientList.push(<li>{this.props.recipe.ingredients[i]}</li>);
		// }
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
						onClick={this.props.deleteRecipe}
						className="deleteRecipeButton"
					>
						x
					</button>
				</div>
				<p className="ingredientsLabel">Ingredients</p>
				<p className="ingredientItems">{this.props.recipe.ingredients}</p>
				<label className="rating">Rating:</label>
				<input type="text" className="rating"></input>
			</div>
		);
	}
}

const Link = () => {
	return <a href={this.props.link}>link</a>;
};

// class IngredientItem extends Component {
// 	render() {
// 		return <p>ingredientItem</p>;
// 	}
// }

export default Recipe;
