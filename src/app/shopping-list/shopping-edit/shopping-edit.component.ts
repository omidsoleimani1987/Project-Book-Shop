import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/models/ingredient.model';
import { ShoppingListService } from './../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.action';
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

  constructor(
    private slService: ShoppingListService,
    private store: Store<{ ingredients: Ingredient[] }>
  ) {}

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
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  onClearForm(): void {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDeleteItem(): void {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClearForm();
  }

  ngOnDestroy(): void {
    this.editingSubscription.unsubscribe();
  }
}
