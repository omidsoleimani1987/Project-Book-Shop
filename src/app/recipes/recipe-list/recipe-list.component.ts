import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Recipe } from '../../shared/models/recipe.model';
import { RecipeService } from './../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  onRecipeSelected(recipeItem: Recipe): void {
    this.recipeWasSelected.emit(recipeItem);
  }
}
