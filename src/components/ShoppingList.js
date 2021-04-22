import React, { useEffect } from 'react';

const ShoppingList = (props) => {
	useEffect(() => {
		props.loadShoppingList();
	}, []);

	const clearShoppingList = () => {
		fetch('/shopping/clearShoppingList', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		}).catch((err) => console.log('clearShoppingList ERROR: ', err));
	};

	const items = [];

	// const shoppingMarkets = {};
	for (let i = 0; i < props.shoppingList.length; i++) {
		const shoppingList = props.shoppingList[i].ingredients;
		for (let j = 0; j < shoppingList.length; j++) {
			items.push(<Item key={'item' + i + j} item={shoppingList[j]} />);
		}
	}

	return (
		<div id="shoppingListContainer">
			<div id="shoppingListHeader">
				<h2>Shopping List</h2>
				<button
					id="clearButton"
					onClick={() => {
						clearShoppingList();
						props.loadShoppingList();
					}}
				>
					clear
				</button>
			</div>
			<ul id="shoppingList">{items}</ul>
		</div>
	);
};

const Item = (props) => {
	return <li className="items">{props.item}</li>;
};

export default ShoppingList;
