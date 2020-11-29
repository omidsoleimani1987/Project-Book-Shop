import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../../shared/models/recipe.model';
import { RecipeService } from './../recipe.service';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  @Input() selectedToShowDetail: Recipe;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {}

  onAddToShoppingList(): void {
    this.recipeService.addIngredientsToShoppingList(
      this.selectedToShowDetail.ingredients
    );
  }
}
