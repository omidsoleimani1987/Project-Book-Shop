import { Action } from '@ngrx/store';

import { Ingredient } from './../../shared/models/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export class AddIngredient implements Action {
  constructor(public payload: Ingredient) {}

  readonly type = ADD_INGREDIENT;
}
