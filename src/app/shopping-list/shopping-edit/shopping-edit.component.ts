import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from '../../shared/models/ingredient.model';
import { ShoppingListService } from './../shopping-list.service';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {}

  onAddItem(form: NgForm): void {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    this.slService.addIngredient(newIngredient);
  }
}
