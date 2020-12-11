import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { Recipe } from '../../shared/models/recipe.model';
import * as fromApp from '../../store/app.reducer';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipeSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.recipeSubscription = this.store
      .select('recipe')
      .pipe(map(recipeState => recipeState.recipes))
      .subscribe(recipe => {
        this.recipes = recipe;
      });
  }

  onNewRecipe(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }
}
