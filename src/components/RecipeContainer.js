import React, { Component } from "react";
import Recipe from "./Recipe";

class RecipeContainer extends Component {
	constructor() {
		super();
	}

	render() {
		const recipes = [];
		for (let i = 0; i < this.props.recipes.length; i++) {
			recipes.push(
				<Recipe
					key={"recipe" + i}
					recipeKey={"recipe" + i}
					recipe={this.props.recipes[i]}
					deleteRecipe={this.props.deleteRecipe}
					getRecipes={this.props.getRecipes}
				/>
			);
		}

		return (
			<div>
				<h2>{this.props.market}</h2>
				<div className="recipesContainer">{recipes}</div>
			</div>
		);
	}
}

export default RecipeContainer;
