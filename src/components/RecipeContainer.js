import React from 'react';
import Recipe from './Recipe';

const RecipeContainer = (props) => {
	const recipes = [];
	for (let i = 0; i < props.recipes.length; i++) {
		recipes.push(
			<Recipe
				key={props.recipes[i].category + i}
				recipeKey={props.recipes[i].category + i}
				recipe={props.recipes[i]}
				deleteRecipe={props.deleteRecipe}
				getRecipes={props.getRecipes}
				loadShoppingList={props.loadShoppingList}
			/>
		);
	}

	return (
		<div className="marketDivs">
			<h2>{props.market}</h2>
			<div className="recipesContainer">{recipes}</div>
		</div>
	);
};

export default RecipeContainer;
