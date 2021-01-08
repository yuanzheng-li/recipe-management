import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') form!: NgForm;

  edittingStartedSubscription!: Subscription;
  editMode: boolean = false;
  edittingIndex!: number;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.edittingStartedSubscription = this.shoppingListService.edittingStarted.subscribe((index: number) => {
      this.editMode = true;
      this.edittingIndex = index;
      const editIngredient = this.shoppingListService.getIngredientByIndex(index);
      this.form.setValue({
        name: editIngredient.name,
        amount: editIngredient.amount
      });
    });
  }

  ngOnDestroy(): void {
    this.edittingStartedSubscription.unsubscribe();
  }

  onSubmit(form: NgForm): void {
    const value = form.value;
    const ingredient = new Ingredient(value.name, parseInt(value.amount));
    if(this.editMode) {
      this.shoppingListService.updateIngredient(ingredient, this.edittingIndex);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }

    this.editMode = false;
    form.reset();
  }

  onClear(form: NgForm): void {
    form.reset();
    this.editMode = false;
  }

  onDelete(form: NgForm): void {
    this.shoppingListService.deleteIngredient(this.edittingIndex);
    this.onClear(form);
  }
}
