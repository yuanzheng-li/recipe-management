import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', { static: true }) name!: ElementRef<HTMLInputElement>;
  @ViewChild('amountInput', { static: true }) amount!: ElementRef<HTMLInputElement>;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  onAdd() {
    this.shoppingListService.addIngredient(
      new Ingredient(
        this.name.nativeElement.value,
        parseInt(this.amount.nativeElement.value)
      )
    );
  }
}
