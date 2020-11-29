import { EventEmitter } from '@angular/core';

import { Ingredient } from './../shared/models/ingredient.model';
export class ShoppingListService {
  // to inform other components of new changes
  ingredientChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [];

  getIngredient(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredientItem: Ingredient): void {
    this.ingredients.push(ingredientItem);
    this.ingredientChanged.emit(this.ingredients.slice());
  }

  addCompleteIngredients(ingredients: Ingredient[]): void {
    // spread operator changes the array og elements to a list of elements
    this.ingredients.push(...ingredients);
    this.ingredientChanged.emit(this.ingredients.slice());
  }
}
