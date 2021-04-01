import React, { Component } from "react";

class ShoppingList extends Component {
	componentDidMount() {
		this.props.loadShoppingList();
	}

	render() {
		const items = [];

		// const shoppingMarkets = {};
		for (let i = 0; i < this.props.shoppingLists.length; i++) {
			const shoppingList = this.props.shoppingLists[i].ingredients;
			for (let j = 0; j < shoppingList.length; j++) {
				items.push(<Item key={"item" + i + j} item={shoppingList[j]} />);
			}
		}

		return (
			<div id="shoppingListContainer">
				<h2>Shopping List</h2>
				<ul id="shoppingList">{items}</ul>
			</div>
		);
	}
}

function Item(props) {
	return <li className="items">{props.item}</li>;
}

export default ShoppingList;
