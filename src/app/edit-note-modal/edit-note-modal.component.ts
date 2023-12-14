// edit-note-modal.component.ts

import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Note } from '../interface/note.interface';

@Component({
  selector: 'app-edit-note-modal',
  templateUrl: './edit-note-modal.component.html',
  styleUrls: ['./edit-note-modal.component.css'],
})
export class EditNoteModalComponent implements OnInit {
  // Компонент для редагування нотатки.
  
  editedNote: Note = { title: '', text: '', color: 'white', labels: [], categories: [] }; // Нова нотатка
  editMode: boolean = false; // Режим редагування
  newLabel: string = ''; // Нова мітка
  newCategory: string = ''; // Нова категорія

  constructor(
    public dialogRef: MatDialogRef<EditNoteModalComponent>, // Для управління модальним вікном
    @Inject(MAT_DIALOG_DATA) public data: { // Дані, передані в модальне вікно
      note: Note;
      addNote?: (note: Note, index: number) => void;
      editMode?: boolean;
      index: number;
      allLabels?: string[];
      allCategories?: string[];
    }
  ) {}

  ngOnInit(): void {
    // Ініціалізація компоненту під час його створення.
    this.editedNote = { ...this.data.note }; // Копіюємо дані нотатки для редагування
    this.editMode = this.data.editMode ?? false; // Визначаємо, чи це режим редагування
  }

  onSave(): void {
    // Метод для збереження редагованої нотатки.
    if (this.data?.addNote && typeof this.data.addNote === 'function') {
      this.data.addNote(this.editedNote, this.data.index);
      this.dialogRef.close(); // Закриваємо модальне вікно після збереження
    } else {
      console.error('Invalid data object or addNote is not a valid function', this.data);
    }
  }

  onCancel(): void {
    // Метод для відміни редагування і закриття модального вікна.
    this.dialogRef.close();
  }

  addNewLabel(): void {
    // Метод для додавання нового ярлика.
    if (this.newLabel && this.editedNote.labels.indexOf(this.newLabel) === -1 && this.data?.allLabels?.includes(this.newLabel)) {
      this.editedNote.labels.push(this.newLabel);
      this.newLabel = '';
    }
  }

  removeLabel(index: number): void {
    // Метод для видалення ярлика за індексом.
    this.editedNote.labels.splice(index, 1);
  }

  addNewCategory(): void {
    // Метод для додавання нової категорії.
    if (this.newCategory && this.editedNote.categories.indexOf(this.newCategory) === -1 && this.data?.allCategories?.includes(this.newCategory)) {
      this.editedNote.categories.push(this.newCategory);
      this.newCategory = '';
    }
  }

  removeCategory(index: number): void {
    // Метод для видалення категорії за індексом.
    this.editedNote.categories.splice(index, 1);
  }
}

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [EditNoteModalComponent],
})
export class EditNoteModalModule {}