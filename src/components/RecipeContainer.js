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
					recipe={this.props.recipes[i]}
					deleteRecipe={this.props.deleteRecipe}
				/>
			);
		}
		return <div className="recipesContainer">{recipes}</div>;
	}
}

export default RecipeContainer;
