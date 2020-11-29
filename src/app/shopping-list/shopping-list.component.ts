import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredient();

    // to get new possible changes in the array because we get a slice of the array not original array
    this.slService.ingredientChanged.subscribe(
      (newIngredientArray: Ingredient[]) => {
        this.ingredients = newIngredientArray;
      }
    );
  }
}
