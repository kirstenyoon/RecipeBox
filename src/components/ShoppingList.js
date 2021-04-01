import React, { Component } from "react";

class ShoppingList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// shoppingLists: [],
		};
		// this.loadShoppingList = this.loadShoppingList.bind(this);
	}

	componentDidMount() {
		this.props.loadShoppingList();
	}

	// loadShoppingList() {
	// 	fetch("/shopping/")
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			this.setState({ shoppingLists: data });
	// 			console.log("shoppingLists:", this.state.shoppingLists);
	// 		})
	// 		.catch((error) => console.log("Error: ", error));
	// }

	render() {
		const items = [];
		console.log("list", this.props.shoppingLists);
		// Iterate over shopping list
		// for (let i = 0; i < this.props.shoppingList.length; i++) {
		// 	for (let j = 0; j < this.props.shoppingList[i].length; j++) {
		// 		// Push item to items array
		// 		items.push(
		// 			<Item key={"item" + i + j} item={this.props.shoppingList[i][j]} />
		// 		);
		// 	}
		// }

		// const shoppingMarkets = {};
		for (let i = 0; i < this.props.shoppingLists.length; i++) {
			const shoppingList = this.props.shoppingLists[i].ingredients;
			// console.log(shoppingList);
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
