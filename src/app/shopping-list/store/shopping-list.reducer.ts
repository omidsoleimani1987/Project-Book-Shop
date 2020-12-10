import { Ingredient } from '../../shared/models/ingredient.model';

const initialState = {
  ingredients: [
    new Ingredient('apples', 5), //
    new Ingredient('Tomatoes', 10)
  ]
};

export function ShoppingListReducer(state = initialState, action) {}
