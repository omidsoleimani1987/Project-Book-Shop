import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

import { Recipe } from './../shared/models/recipe.model';

import { DataStorageService } from './../shared/services/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}

  // adding the resolver to fetch the data before the component is loaded
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    const currentRecipe = this.recipeService.getRecipes();

    if (currentRecipe.length === 0) {
      return this.dataStorageService.fetchRecipes();
    } else {
      return currentRecipe;
    }
  }
}
