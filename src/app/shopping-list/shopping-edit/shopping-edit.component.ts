import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/models/ingredient.model';
import { ShoppingListService } from './../shopping-list.service';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editingSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  @ViewChild('form') shoppingListForm: NgForm;

  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
    this.editingSubscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.slService.getSingleIngredient(index);
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onAddItem(form: NgForm): void {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    this.slService.addIngredient(newIngredient);
  }

  ngOnDestroy(): void {
    this.editingSubscription.unsubscribe();
  }
}
