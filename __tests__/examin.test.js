import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import App from '../src/components/App';
import RecipesContainer from '../src/components/RecipesContainer';
import ShoppingList from '../src/components/ShoppingList';

describe('App Component', () => {
	const wrapper = mount(<App />);

	it('Contains RecipesContainer component', () => {
		expect(wrapper.find(RecipesContainer).length).toBe(1);
	});

	it('Contains ShoppingList component', () => {
		expect(wrapper.find(ShoppingList).length).toBe(1);
	});

	it('App includes html elements', () => {
		expect(wrapper.find('div').length).toEqual(2);
		expect(wrapper.find('button').length).toEqual(1);
	});
});

describe('RecipesContainer Component', () => {
	let mockdeleteRecipe = jest.fn();
	let mockgetRecipes = jest.fn();
	let mockloadShoppingList = jest.fn();
	let RecipesContainerProps = {
		recipes: [],
		deleteRecipe: 'mockdeleteRecipe',
		getRecipes: 'mockgetRecipes',
		shoppingList: [],
		loadShoppingList: 'mockloadShoppingList',
	};

	const wrapper = mount(<RecipesContainer {...RecipesContainerProps} />);

	it('RecipesContainer includes html elements', () => {
		expect(wrapper.find('div').length).toEqual(1);
	});
});

describe('ShoppingList Component', () => {
	let mockloadShoppingList = jest.fn();
	let ShoppingListProps = {
		shoppingList: [],
		loadShoppingList: 'mockloadShoppingList',
	};

	const wrapper = mount(<ShoppingList {...ShoppingListProps} />);

	it('ShoppingList includes html elements', () => {
		expect(wrapper.find('div').length).toEqual(2);
		expect(wrapper.find('h2').length).toEqual(1);
		expect(wrapper.find('button').length).toEqual(1);
		expect(wrapper.find('ul').length).toEqual(1);
	});
});
