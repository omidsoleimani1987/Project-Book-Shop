import * as RecipeActions from './recipe.actions';

import { Recipe } from './../../shared/models/recipe.model';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: []
};

export function RecipeReducer(
  state: State = initialState,
  action: RecipeActions.RecipeActionsTypes
): State {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };

    default:
      return state;
  }
}
