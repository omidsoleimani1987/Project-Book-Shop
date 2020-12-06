import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './../shared/models/recipe.model';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super tasty Schnitzel',
      'https://i3-img.kabeleins.de/pis/ezone/b85cqgELB38wdEB0AB1fHPDQCtTDCJ4UYl_Ic-IXCoYylZ0mXbP3Z8_B4JBo6LCimhDa22AtrTM8DB_M9Sv4e9OM8slbXthgEbE4ubOs1rnC2jOcxZ9a-oZ09bK01Tt0b1vpGmsgVYDky7gxWa9Ji7hMq0kR_pQ2jRtK2fQmW4rytj1AFXX-l6q3zvzGC0WR4MrZm2eVebI8dVElyIxxoffiauzSGJCqKiLU64nsO3YYm77aW-CmLiBxue3Xb7cEvMfmUM1lzYjwCbSan5Q7lQCikI2SfI2G/profile:mag-996x562',
      [new Ingredient('Meat', 2), new Ingredient('Tomato', 4)]
    ),
    new Recipe(
      'Big Fat Burger',
      'what else you need to have?',
      'https://nebula.wsimg.com/343f16710d2a7d2b8ba4f51115a95f67?AccessKeyId=531592D248B589D87A56&disposition=0&alloworigin=1',
      [new Ingredient('Meat', 4), new Ingredient('Bread', 2)]
    )
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipeById(index: number): Recipe {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.slService.addCompleteIngredients(ingredients);
  }

  addRecipe(newRecipe: Recipe): void {
    this.recipes.push(newRecipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, updatedRecipe: Recipe): void {
    this.recipes[index] = updatedRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
