import React, { Component } from "react";
import RecipeContainer from "./RecipeContainer";

class RecipesContainer extends Component {
	addRecipe() {}

	render() {
		return (
			<div>
				<RecipeContainer
					deleteRecipe={this.props.deleteRecipe}
					recipes={this.props.recipes}
				/>
			</div>
		);
	}
}

export default RecipesContainer;
