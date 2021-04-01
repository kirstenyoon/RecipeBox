import React, { Component } from "react";
import RecipeContainer from "./RecipeContainer";

class RecipesContainer extends Component {
	addRecipe() {}

	render() {
		// Iterate over recipes and store markets in an object
		const marketsCache = {};
		for (let i = 0; i < this.props.recipes.length; i++) {
			if (!marketsCache.hasOwnProperty(this.props.recipes[i].category)) {
				marketsCache[this.props.recipes[i].category] = [this.props.recipes[i]];
			} else {
				marketsCache[this.props.recipes[i].category].push(
					this.props.recipes[i]
				);
			}
		}

		// Create a new RecipeContainer for every market. Pass down recipes for that market
		const markets = [];
		const marketsList = Object.keys(marketsCache);
		for (let i = 0; i < marketsList.length; i++) {
			const recipes = marketsCache[marketsList[i]];
			markets.push(
				<RecipeContainer
					key={"market" + i}
					recipes={recipes}
					deleteRecipe={this.props.deleteRecipe}
					getRecipes={this.props.getRecipes}
					getRecipes={this.props.getRecipes}
					market={marketsList[i]}
					loadShoppingList={this.props.loadShoppingList}
				/>
			);
		}
		return <div>{markets}</div>;
	}
}

export default RecipesContainer;
