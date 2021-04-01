import React, { Component } from "react";
import RecipeContainer from "./RecipeContainer";

class RecipesContainer extends Component {
	addRecipe() {}

	render() {
		return (
			<div>
				<RecipeContainer
					recipes={this.props.recipes}
					deleteRecipe={this.props.deleteRecipe}
					getRecipes={this.props.getRecipes}
				/>
			</div>
		);
	}
}

export default RecipesContainer;
