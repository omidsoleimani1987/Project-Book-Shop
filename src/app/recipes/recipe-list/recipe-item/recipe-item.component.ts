import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Recipe } from '../../../shared/models/recipe.model';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() recipeSelected = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onRecipeSelected(): void {
    this.recipeSelected.emit();
  }
}
