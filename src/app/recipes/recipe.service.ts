import { EventEmitter } from '@angular/core';

import { Recipe } from './../shared/models/recipe.model';
export class RecipeService {
  // for cross component communication
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'A test recipe',
      'this is a test',
      'https://images.squarespace-cdn.com/content/v1/53861df2e4b03d58a4690cff/1406686608383-YSZYPCOLOZFW1PMBW92D/ke17ZwdGBToddI8pDm48kMnHRrpWSlSCB9XabjgyantZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpz4FkPJA585QYBg9EjPvRpkIxxB_SdP_xzqtxyFDizV5aadH9FfX0OATazAJGndjd8/6546676667_e406be7c0f_o.jpg?format=500w'
    ),
    new Recipe(
      'another recipe',
      'this is a good food',
      'https://hips.hearstapps.com/delish/assets/17/39/1506456246-delish-healthy-chicken-casserole-1.jpg'
    ),
  ];

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }
}
