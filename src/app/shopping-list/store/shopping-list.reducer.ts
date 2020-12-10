import { Ingredient } from '../../shared/models/ingredient.model';

import * as ShoppingListActions from './shopping-list.action';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5), //
    new Ingredient('Tomatoes', 7)
  ]
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.ShoppingListActionTypes
) {
  switch (action.type) {
    // add new single ingredient
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };

    // add multiple new ingredients
    case ShoppingListActions.ADD_MULTI_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };

    // replace one item in array of ingredients
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredientToUpdate = state.ingredients[action.payload.index];

      const updatedIngredient = {
        ...ingredientToUpdate,
        ...action.payload.ingredient
      };

      const updatedIngredients = [...state.ingredients];
      updatedIngredients[action.payload.index] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients
      };

    // delete one item in array of ingredients
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ig, igIndex) => igIndex !== action.payload
        )
      };

    default:
      return state;
  }
}
