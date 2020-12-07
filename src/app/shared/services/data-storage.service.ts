import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Recipe } from './../models/recipe.model';

import { RecipeService } from './../../recipes/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes(): void {
    const recipe: Recipe[] = this.recipeService.getRecipes();

    // because we want to create or overwrite any existing recipes
    this.http
      .put(
        'https://recipe-book-cf05a-default-rtdb.firebaseio.com/recipes.json',
        recipe
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }
}
