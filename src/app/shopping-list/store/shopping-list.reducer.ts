import { Ingredient } from '../../shared/models/ingredient.model';

import * as ShoppingListActions from './shopping-list.action';

const initialState = {
  ingredients: [
    new Ingredient('apples', 5), //
    new Ingredient('Tomatoes', 10)
  ]
};

export function ShoppingListReducer(
  state = initialState,
  action: ShoppingListActions.AddIngredient
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
  }
}
