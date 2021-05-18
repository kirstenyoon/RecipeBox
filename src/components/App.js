import React, { useState, useEffect } from 'react';
import RecipesContainer from './RecipesContainer.js';
import AddRecipePopup from './AddRecipePopup';
import { ShoppingList } from './ShoppingList';
import '../stylesheets/styles.scss';

const App = () => {
	const [showPopup, setShowPopup] = useState(false);
	const [showEditPopup, setShowEditPopup] = useState(false);
	const [recipe, setRecipe] = useState({});
	const [recipes, setRecipes] = useState([]);
	const [shoppingList, setShoppingList] = useState([]);

	useEffect(() => {
		getRecipes();
	}, []);

	const getRecipes = () => {
		fetch('/recipes/')
			.then((response) => response.json())
			.then((data) => {
				setRecipes(data);
			})
			.catch((error) => console.log('Error: ', error));
	};

	const togglePopup = () => {
		setShowPopup(!showPopup);
	};

	const addRecipe = (title, category, link, ingredients, notes, rating) => {
		// split ingredients list by commas
		const ingredientsArray = ingredients.split(',');
		// Default category to Any Market
		if (category === '') {
			category = 'Any Market';
		}
		const data = {
			title,
			category,
			link,
			ingredients: ingredientsArray,
			notes,
			rating,
		};
		fetch('/recipes/addRecipe', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => {
				togglePopup();
				getRecipes();
			})
			.catch((err) => console.log('addRecipe ERROR:', err));
	};

	const deleteRecipe = (id) => {
		const data = { _id: id };
		fetch('/recipes/deleteRecipe', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => {
				getRecipes();
			})
			.catch((err) => console.log('deleteRecipe ERROR: ', err));
	};

	const loadShoppingList = () => {
		fetch('/shopping/')
			.then((response) => response.json())
			.then((data) => {
				setShoppingList(data);
			})
			.catch((error) => console.log('Error: ', error));
	};

	return (
		// Add Recipe Popup Div
		<div>
			<button id="addRecipeButton" onClick={togglePopup}>
				Add Recipe
			</button>
			{showPopup && (
				<AddRecipePopup
					content={
						<div className="addRecipePopup">
							<b id="inputTitle">Add Recipe</b>
							<p></p>
							<label className="inputLabels">Title: </label>
							<input
								id="title"
								className="inputs"
								type="text"
								placeholder="required"
							></input>
							<label className="inputLabels">Market: </label>
							<input
								id="category"
								className="inputs"
								type="text"
								placeholder="Any Market (default)"
							></input>
							<label className="inputLabels">Link: </label>
							<input id="link" className="inputs" type="text"></input>
							<label className="inputLabels">Ingredients: </label>
							<input
								id="ingredients"
								className="inputs"
								type="text"
								placeholder="separate ingredients by commas"
							></input>
							<label className="inputLabels">Notes: </label>
							<input id="notes" className="inputs" type="text"></input>
							<label className="inputLabels">Rating: </label>
							<input id="rating" className="inputs" type="text"></input>
							<p></p>
							<button
								onClick={() => {
									const title = document.getElementById('title').value;
									const category = document.getElementById('category').value;
									const link = document.getElementById('link').value;
									const ingredients =
										document.getElementById('ingredients').value;
									const notes = document.getElementById('notes').value;
									const rating = document.getElementById('rating').value;
									addRecipe(title, category, link, ingredients, notes, rating);
								}}
							>
								Add
							</button>
						</div>
					}
					handleClose={togglePopup}
				/>
			)}

			<div id="mainContent">
				<RecipesContainer
					recipes={recipes}
					deleteRecipe={deleteRecipe}
					getRecipes={getRecipes}
					getRecipes={getRecipes}
					shoppingList={shoppingList}
					loadShoppingList={loadShoppingList}
				/>

				<ShoppingList
					shoppingList={shoppingList}
					loadShoppingList={loadShoppingList}
				/>
			</div>
		</div>
	);
};

export default App;
