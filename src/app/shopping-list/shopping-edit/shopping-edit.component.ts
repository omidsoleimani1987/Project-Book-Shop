import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/models/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.action';
import * as fromApp from '../../store/app.reducer';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editingSubscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  @ViewChild('form') shoppingListForm: NgForm;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.editingSubscription = this.store
      .select('shoppingList')
      .subscribe(stateData => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          this.shoppingListForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        } else {
          this.editMode = false;
        }
      });
  }

  onAddItem(form: NgForm): void {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(newIngredient)
      );
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  onClearForm(): void {
    this.shoppingListForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StoptEdit());
  }

  onDeleteItem(): void {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());

    this.onClearForm();
  }

  ngOnDestroy(): void {
    this.editingSubscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StoptEdit());
  }
}
