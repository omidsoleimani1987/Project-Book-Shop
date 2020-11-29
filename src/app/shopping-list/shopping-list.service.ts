import { EventEmitter } from '@angular/core';

import { Ingredient } from './../shared/models/ingredient.model';
export class ShoppingListService {
  // to inform other components of new changes
  ingredientChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 7),
  ];

  getIngredient(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredientItem: Ingredient): void {
    this.ingredients.push(ingredientItem);
    this.ingredientChanged.emit(this.ingredients.slice());
  }
}
