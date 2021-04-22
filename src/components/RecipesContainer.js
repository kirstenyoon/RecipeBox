import React from 'react';
import RecipeContainer from './RecipeContainer';

const RecipesContainer = (props) => {
	// Iterate over recipes and store markets in an object
	const marketsCache = {};
	for (let i = 0; i < props.recipes.length; i++) {
		if (!marketsCache.hasOwnProperty(props.recipes[i].category)) {
			marketsCache[props.recipes[i].category] = [props.recipes[i]];
		} else {
			marketsCache[props.recipes[i].category].push(props.recipes[i]);
		}
	}

	// Create a new RecipeContainer for every market. Pass down recipes for that market
	const markets = [];
	const marketsList = Object.keys(marketsCache);
	for (let i = 0; i < marketsList.length; i++) {
		const recipes = marketsCache[marketsList[i]];
		markets.push(
			<RecipeContainer
				key={'market' + i}
				recipes={recipes}
				deleteRecipe={props.deleteRecipe}
				getRecipes={props.getRecipes}
				getRecipes={props.getRecipes}
				market={marketsList[i]}
				loadShoppingList={props.loadShoppingList}
			/>
		);
	}
	return <div>{markets}</div>;
};

export default RecipesContainer;
