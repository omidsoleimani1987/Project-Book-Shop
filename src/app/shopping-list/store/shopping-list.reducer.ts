import { Ingredient } from '../../shared/models/ingredient.model';

import * as ShoppingListActions from './shopping-list.action';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 7)],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions.ShoppingListActionTypes
): State {
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
      const ingredientToUpdate = state.ingredients[state.editedIngredientIndex];

      const updatedIngredient = {
        ...ingredientToUpdate,
        ...action.payload
      };

      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    // delete one item in array of ingredients
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ig, igIndex) => igIndex !== state.editedIngredientIndex
        ),
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    // start editing the ingredient
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredient: { ...state.ingredients[action.payload] },
        editedIngredientIndex: action.payload
      };

    // stop editing the ingredient
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    default:
      return state;
  }
}
