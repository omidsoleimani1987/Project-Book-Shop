import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from './../models/recipe.model';

import { RecipeService } from './../../recipes/recipe.service';
import * as fromApp from '../../store/app.reducer';
import * as RecipeActions from '../../recipes/store/recipe.actions';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}

  storeRecipes(): void {
    const recipe: Recipe[] = this.recipeService.getRecipes();

    // because we want to create or overwrite any existing recipes
    this.http
      .put<Recipe[]>(
        'https://recipe-book-cf05a-default-rtdb.firebaseio.com/recipes.json',
        recipe
      )
      .subscribe(responseData => {
        // console.log(responseData);
      });
  }

  fetchRecipes(): Observable<Recipe[]> {
    // getting the token from auth service to attach to the request
    // take 1 gives me the latest user only once, it gives one value from user and automatically unsubscribes
    // because we just want the user token on demand, we don't want the on going subscription that gives me the user data when I don't need them
    // *) this.authService.user.pipe(take(1))
    // exhaustMap waits for the first observable to finish, then gives us the data from the previous observable and then returns a new inner observable we return inside the function in exhaustMap

    return this.store.select('auth').pipe(
      take(1),
      map(authState => authState.user),
      exhaustMap(user => {
        return this.http.get<Recipe[]>(
          'https://recipe-book-cf05a-default-rtdb.firebaseio.com/recipes.json',
          {
            // user.token comes from the user model getter
            params: new HttpParams().set('auth', user.token)
          }
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
      tap(recipes => {
        // this.recipeService.setRecipes(recipes);
        this.store.dispatch(new RecipeActions.SetRecipes(recipes));
      })
    );
  }
}
