import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { AppState } from 'src/app/store/app.reducer';
import { AddIngredient, DeleteIngredient, EditStop, UpdateIngredient } from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') form!: NgForm;

  editingStartedSubscription!: Subscription;
  editMode: boolean = false;
  editingIndex!: number;

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.editingStartedSubscription = this.store.select('shoppingList').subscribe(
      ({isEditing, editingIndex, ingredients}) => {
        if(editingIndex > -1) {
          this.editMode = isEditing;
          this.editingIndex = editingIndex;
          const editIngredient = ingredients[this.editingIndex];
          this.form.setValue({
            name: editIngredient.name,
            amount: editIngredient.amount,
          });
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.editingStartedSubscription.unsubscribe();
    this.store.dispatch(new EditStop());
  }

  onSubmit(form: NgForm): void {
    const value = form.value;
    const ingredient = new Ingredient(value.name, parseInt(value.amount));
    if (this.editMode) {
      this.store.dispatch(new UpdateIngredient(ingredient));
    } else {
      this.store.dispatch(new AddIngredient(ingredient));
    }

    this.store.dispatch(new EditStop());
    form.reset();
  }

  onClear(form: NgForm): void {
    form.reset();
    this.store.dispatch(new EditStop());
  }

  onDelete(form: NgForm): void {
    this.store.dispatch(new DeleteIngredient());
    this.onClear(form);
  }
}
