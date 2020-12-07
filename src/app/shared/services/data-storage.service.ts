import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
      .put<Recipe[]>(
        'https://recipe-book-cf05a-default-rtdb.firebaseio.com/recipes.json',
        recipe
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  fetchRecipes(): void {
    this.http
      .get<Recipe[]>(
        'https://recipe-book-cf05a-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map(recipes => {
          // to check if all fetched recipe items have the property named ingredients
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        })
      )
      .subscribe(responseData => {
        this.recipeService.setRecipes(responseData);
      });
  }
}
