import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Recipe } from '../../shared/models/recipe.model';
import { RecipeService } from './../recipe.service';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  selectedToShowDetail: Recipe;
  recipeId: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeId = +params['id'];
      this.selectedToShowDetail = this.recipeService.getRecipeById(
        this.recipeId
      );
    });
  }

  onAddToShoppingList(): void {
    this.recipeService.addIngredientsToShoppingList(
      this.selectedToShowDetail.ingredients
    );
  }
}
