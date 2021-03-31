import React, { Component } from "react";
import Recipe from "./Recipe";

class RecipeContainer extends Component {
	constructor() {
		super();

		this.state = {
			recipes: [],
		};
	}

	getRecipes() {
		fetch("/recipes/")
			.then((response) => response.json())
			.then((data) => {
				this.setState({ recipes: data });
			})
			.catch((error) => console.log("Error: ", error));
	}

	componentDidMount() {
		this.getRecipes();
	}

	render() {
		const recipes = [];
		for (let i = 0; i < this.state.recipes.length; i++) {
			recipes.push(
				<Recipe key={"recipe" + i} recipe={this.state.recipes[i]} />
			);
		}
		return <div id="recipeContainer">{recipes}</div>;
	}
}

export default RecipeContainer;
