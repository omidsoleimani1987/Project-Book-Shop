import { Subject } from 'rxjs';

import { Ingredient } from './../shared/models/ingredient.model';
export class ShoppingListService {
  // to inform other components of new changes
  // ingredientChanged = new EventEmitter<Ingredient[]>();
  ingredientChanged = new Subject<Ingredient[]>();

  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [];

  getIngredient(): Ingredient[] {
    return this.ingredients.slice();
  }

  getSingleIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  addIngredient(ingredientItem: Ingredient): void {
    this.ingredients.push(ingredientItem);
    // this.ingredientChanged.emit(this.ingredients.slice());
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addCompleteIngredients(ingredients: Ingredient[]): void {
    // spread operator changes the array og elements to a list of elements
    this.ingredients.push(...ingredients);
    // this.ingredientChanged.emit(this.ingredients.slice());
    this.ingredientChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient): void {
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
