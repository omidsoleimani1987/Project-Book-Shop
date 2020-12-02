import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientChangeSubscription: Subscription;

  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredient();

    // to get new possible changes in the array because we get a slice of the array not original array
    this.ingredientChangeSubscription = this.slService.ingredientChanged.subscribe(
      (newIngredientArray: Ingredient[]) => {
        this.ingredients = newIngredientArray;
      }
    );
  }

  ngOnDestroy(): void {
    this.ingredientChangeSubscription.unsubscribe();
  }
}
