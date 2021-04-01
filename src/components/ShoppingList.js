import React, { Component } from "react";

class ShoppingList extends Component {
	componentDidMount() {
		this.props.loadShoppingList();
	}

	clearShoppingList() {
		fetch("/shopping/clearShoppingList", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		}).catch((err) => console.log("clearShoppingList ERROR: ", err));
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
				<div id="shoppingListHeader">
					<h2>Shopping List</h2>
					<button
						id="clearButton"
						onClick={() => {
							this.clearShoppingList();
							this.props.loadShoppingList();
						}}
					>
						clear
					</button>
				</div>
				<ul id="shoppingList">{items}</ul>
			</div>
		);
	}
}

function Item(props) {
	return <li className="items">{props.item}</li>;
}

export default ShoppingList;
