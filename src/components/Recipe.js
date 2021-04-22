import React, { useState, useEffect } from 'react';
import EditRecipePopup from './EditRecipePopup';

const Recipe = (props) => {
	const [rating, setRating] = useState(-1);
	const [showEditPopup, setShowEditPopup] = useState(false);

	const toggleEditPopup = () => {
		setShowEditPopup(!showEditPopup);
	};

	const editRecipe = (
		id,
		title,
		category,
		link,
		ingredients,
		notes,
		rating
	) => {
		// split ingredients list by commas
		const ingredientsArray = ingredients.split(',');
		const data = {
			_id: id,
			title,
			category,
			link,
			ingredients: ingredientsArray,
			notes,
			rating,
		};
		fetch('/recipes/editRecipe', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => {
				toggleEditPopup();
				props.getRecipes();
			})
			.catch((err) => console.log('editRecipe ERROR: ', err));
	};

	const addToList = (id, category, ingredients) => {
		const data = {
			market: category,
			ingredients,
		};

		fetch('/shopping/addToShoppingList', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => {
				props.loadShoppingList();
			})
			.catch((err) => console.log('addToList ERROR:', err));
	};

	const ingredientList = [];
	for (let i = 0; i < props.recipe.ingredients.length; i++) {
		ingredientList.push(
			<Ingredient
				key={'ingredient' + i}
				ingredient={props.recipe.ingredients[i]}
			/>
		);
	}

	return (
		<div className="recipes">
			<div>
				<div className="recipeHeader">
					<div className="recipeHeaderText">
						<p className="recipeTitles">{props.recipe.title}</p>
						{/* Add link if exists */}
						{props.recipe.link && (
							<a
								className="recipeLinks"
								href={props.recipe.link}
								target="_blank"
							>
								link
							</a>
						)}
					</div>
					<button
						onClick={() => {
							props.deleteRecipe(props.recipe._id);
						}}
						className="deleteRecipeButton"
					>
						X
					</button>
				</div>
				{props.recipe.ingredients && (
					<p className="ingredientsLabel">Ingredients</p>
				)}
				<ul className="ingredientLists">{ingredientList}</ul>

				{props.recipe.notes && <label className="notesLabel">Notes:</label>}
				<p className="notes">{props.recipe.notes}</p>
			</div>

			<div className="recipeBottom">
				<div className="ratingLine">
					{props.recipe.rating && <label className="rating">Rating:</label>}
					<p>{props.recipe.rating}</p>
				</div>

				<div className="recipeCardButtons">
					<button
						className="editButton"
						onClick={() => {
							toggleEditPopup();
						}}
					>
						Edit
					</button>
					{showEditPopup && (
						<EditRecipePopup
							content={
								<div className="editRecipePopup">
									<b id="inputTitle">Edit Recipe</b>
									<p></p>
									<label className="inputLabels">Title: </label>
									<input
										id="title"
										className="inputs"
										type="text"
										defaultValue={props.recipe.title}
										placeholder="required"
									></input>
									<label className="inputLabels">Market: </label>
									<input
										id="category"
										className="inputs"
										type="text"
										defaultValue={props.recipe.category}
										placeholder="Any Market (default)"
									></input>
									<label className="inputLabels">Link: </label>
									<input
										id="link"
										className="inputs"
										type="text"
										defaultValue={props.recipe.link}
									></input>
									<label className="inputLabels">Ingredients: </label>
									<input
										id="ingredients"
										className="inputs"
										type="text"
										placeholder="separate ingredients by commas"
										defaultValue={props.recipe.ingredients}
									></input>
									<label className="inputLabels">Notes: </label>
									<input
										id="notes"
										className="inputs"
										type="text"
										defaultValue={props.recipe.notes}
									></input>
									<label className="inputLabels">Rating: </label>
									<input
										id="rating"
										className="inputs"
										type="text"
										defaultValue={props.recipe.rating}
									></input>
									<p></p>
									<button
										onClick={() => {
											const title = document.getElementById('title').value;
											const category = document.getElementById('category')
												.value;
											const link = document.getElementById('link').value;
											const ingredients = document.getElementById('ingredients')
												.value;
											const notes = document.getElementById('notes').value;
											const rating = document.getElementById('rating').value;
											editRecipe(
												props.recipe._id,
												title,
												category,
												link,
												ingredients,
												notes,
												rating
											);
										}}
									>
										Update
									</button>
								</div>
							}
							handleClose={toggleEditPopup}
						/>
					)}
					<button
						className="addButton"
						onClick={() => {
							addToList(
								props.recipe._id,
								props.recipe.category,
								props.recipe.ingredients
							);
							props.getRecipes();
						}}
					>
						Add To List
					</button>
				</div>
			</div>
		</div>
	);
};

const Ingredient = (props) => {
	return <li className="ingredients">{props.ingredient}</li>;
};

export default Recipe;
