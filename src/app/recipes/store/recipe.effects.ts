import { User } from './../../auth/user.model';
import { switchMap, map } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Recipe } from './../../shared/models/recipe.model';
import * as RecipeActions from './recipe.actions';
@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        'https://recipe-book-cf05a-default-rtdb.firebaseio.com/recipes.json'
      );
    }),
    map(recipes => {
      // to check if all fetched recipe items have the property named ingredients
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    map(recipes => {
      return new RecipeActions.SetRecipes(recipes);
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
