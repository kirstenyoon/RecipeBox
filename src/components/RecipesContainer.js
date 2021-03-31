import React, { Component } from "react";
import RecipeContainer from "./RecipeContainer";

class RecipesContainer extends Component {
	addRecipe() {}

	render() {
		return (
			<div>
				<button>Add Recipe</button>
				<RecipeContainer />
			</div>
		);
	}
}

export default RecipesContainer;
