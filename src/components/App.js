import React, { Component } from "react";
import RecipesContainer from "./RecipesContainer.js";
import AddRecipePopup from "./AddRecipePopup";
import "../stylesheets/styles.scss";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { showPopup: false };
		this.togglePopup = this.togglePopup.bind(this);
	}

	togglePopup() {
		this.setState({
			showPopup: !this.state.showPopup,
		});
	}

	render() {
		return (
			<div>
				<button onClick={this.togglePopup}>Add Recipe</button>

				{this.state.showPopup && (
					<AddRecipePopup
						content={
							<div className="addRecipePopup">
								<b>Add Recipe</b>
								<p></p>
								<label>Title: </label>
								<input type="text"></input>
								<label>Link: </label>
								<input type="text"></input>
								<label>Ingredients: </label>
								<input type="text"></input>
								<label>Notes: </label>
								<input type="text"></input>
								<label>Rating: </label>
								<input type="text"></input>
							</div>
						}
						handleClose={this.togglePopup}
					/>
				)}

				<RecipesContainer togglePopup={this.togglePopup} />
			</div>
		);
	}
}

export default App;
