import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', { static: true }) name!: ElementRef<HTMLInputElement>;
  @ViewChild('amountInput', { static: true }) amount!: ElementRef<HTMLInputElement>;
  @Output() addIngredient = new EventEmitter<Ingredient>();

  constructor() {}

  ngOnInit(): void {}

  onAdd() {
    this.addIngredient.emit(
      new Ingredient(
        this.name.nativeElement.value,
        parseInt(this.amount.nativeElement.value)
      )
    );
  }
}
