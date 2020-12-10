import { Action } from '@ngrx/store';

import { Ingredient } from './../../shared/models/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_MULTI_INGREDIENTS = 'ADD_MULTI_INGREDIENTS';

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;

  constructor(public payload: Ingredient) {}
}

export class AddMultiIngredients implements Action {
  readonly type = ADD_MULTI_INGREDIENTS;

  constructor(public payload: Ingredient[]) {}
}

export type ShoppingListActionTypes = AddIngredient | AddMultiIngredients;
