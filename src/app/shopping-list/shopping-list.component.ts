import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Ingredient } from '../shared/models/ingredient.model';
import * as ShoppingListActions from './store/shopping-list.action';
import * as fromApp from '../store/app.reducer';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    // select a slice of the state and returns an observable
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.store.select('shoppingList').subscribe(); --- don't need to use asyn pipe in html then
  }

  onEditItem(index: number): void {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
