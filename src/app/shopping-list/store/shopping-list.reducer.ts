import { Action } from '@ngrx/store';

import { Ingredient } from '../../shared/models/ingredient.model';

const initialState = {
  ingredients: [
    new Ingredient('apples', 5), //
    new Ingredient('Tomatoes', 10)
  ]
};

export function ShoppingListReducer(state = initialState, action: Action) {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      return {
        ...state,
        ingredients: [...state.ingredients, action]
      };
  }
}
