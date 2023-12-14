// category-label-modal.component.ts

import { Component, Inject, PLATFORM_ID, NgModule } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-label-modal',
  templateUrl: './category-label-modal.component.html',
  styleUrls: ['./category-label-modal.component.css']
})
export class CategoryLabelModalComponent {
  newLabel: string = ''; // Нова мітка
  newCategory: string = ''; // Нова категорія
  existingLabels: string[] = []; // Існуючі мітки
  existingCategories: string[] = []; // Існуючі категорії

  constructor(
    public dialogRef: MatDialogRef<CategoryLabelModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(PLATFORM_ID) private platformId: Object,
    private dialog: MatDialog
  ) {
    // Передбачається, що в даних є existingLabels і existingCategories
    this.existingLabels = data.existingLabels || [];
    this.existingCategories = data.existingCategories || [];
  }

  // Метод для створення нового ярлика
  createNewLabel() {
    if (this.newLabel && this.existingLabels.indexOf(this.newLabel) === -1) {
      this.existingLabels.push(this.newLabel);
      this.saveExistingLabelsAndCategories(); // Зберігаємо зміни в локальному сховищі
    }
    this.newLabel = ''; // Очищаємо поле введення нового ярлика
  }

  // Метод для створення нової категорії
  createNewCategory() {
    if (this.newCategory && this.existingCategories.indexOf(this.newCategory) === -1) {
      this.existingCategories.push(this.newCategory);
      this.saveExistingLabelsAndCategories(); // Зберігаємо зміни в локальному сховищі
    }
    this.newCategory = ''; // Очищаємо поле введення нової категорії
  }

  // Метод для закриття модального вікна
  cancel() {
    this.dialogRef.close();
  }

  // Метод для видалення ярлика
  removeLabel(label: string) {
    const index = this.existingLabels.indexOf(label);
    if (index !== -1) {
      this.existingLabels.splice(index, 1);
      this.saveExistingLabelsAndCategories(); // Зберігаємо зміни в локальному сховищі
    }
  }

  // Метод для видалення категорії
  removeCategory(category: string) {
    const index = this.existingCategories.indexOf(category);
    if (index !== -1) {
      this.existingCategories.splice(index, 1);
      this.saveExistingLabelsAndCategories(); // Зберігаємо зміни в локальному сховищі
    }
  }

  // Метод для збереження існуючих ярликів та категорій в локальному сховищі
  private saveExistingLabelsAndCategories() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem('existingLabels', JSON.stringify(this.existingLabels));
        localStorage.setItem('existingCategories', JSON.stringify(this.existingCategories));
        console.log('Існуючі ярлики та категорії збережено в локальне сховище:', this.existingLabels, this.existingCategories);
      } catch (error) {
        console.error('Помилка збереження існуючих ярликів та категорій в LocalStorage:', error);
      }
    }
  }

  // Приклад відкриття іншого модального вікна за допомогою MatDialog
  openAnotherModal() {
    const dialogRef = this.dialog.open(CategoryLabelModalComponent, {
      // Додайте конфігурацію для іншого модального вікна
    });
  }
}

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [CategoryLabelModalComponent],
  exports: [CategoryLabelModalComponent],
})
export class CategoryLabelModalModule {}