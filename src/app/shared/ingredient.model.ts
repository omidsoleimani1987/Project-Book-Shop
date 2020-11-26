import { Ingredient } from './ingredient.model';
/*
export class Ingredient {
  public name: string;
  public amount: number;

  constructor(name: string, amount: number) {
    this.name = name;
    this.amount = amount;
  }
}
*/

// or shortcut

export class Ingredient {
  constructor(public name: string, public amount: number) {}
}
