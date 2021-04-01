import React, { Component } from "react";

class ShoppingList extends Component {
	render() {
		console.log("SHOPPING LIST", this.props.shoppingList);
		return (
			<div id="shoppingListContainer">
				<h2>Shopping List</h2>
				<ul id="shoppingList">
					<li>Item</li>
					<li>Item</li>
					<li>Item</li>
					<li>Item</li>
				</ul>
			</div>
		);
	}
}

export default ShoppingList;
