import { Action } from '@ngrx/store';

import { Ingredient } from './../../shared/models/ingredient.model';

export const ADD_INGREDIENT = '[Shopping List] Add Ingredient';
export const ADD_MULTI_INGREDIENTS = '[Shopping List] Add Multiple Ingredients';
export const UPDATE_INGREDIENT = '[Shopping List] Update Ingredient';
export const DELETE_INGREDIENT = '[Shopping List] Delete Ingredient';
export const START_EDIT = '[Shopping List] Start Edit';
export const STOP_EDIT = '[Shopping List] Stop Edit';

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;

  constructor(public payload: Ingredient) {}
}

export class AddMultiIngredients implements Action {
  readonly type = ADD_MULTI_INGREDIENTS;

  constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;

  constructor(public payload: Ingredient) {}
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
}

export class StartEdit implements Action {
  readonly type = START_EDIT;

  constructor(public payload: number) {}
}

export class StoptEdit implements Action {
  readonly type = STOP_EDIT;
}

export type ShoppingListActionTypes =
  | AddIngredient
  | AddMultiIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEdit
  | StoptEdit;
