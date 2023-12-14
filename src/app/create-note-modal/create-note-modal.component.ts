import { Component, Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Note } from '../interface/note.interface';

@Component({
  selector: 'app-create-note-modal',
  templateUrl: './create-note-modal.component.html',
  styleUrls: ['./create-note-modal.component.css']
})
export class CreateNoteModalComponent {
  // Властивості компонента
  newNote: Note = { title: '', text: '', color: 'white', labels: [], categories: [] };
  labelInput: string = ''; // Введене значення для мітки
  categoryInput: string = ''; // Введене значення для категорії
  existingLabels: string[] = []; // Існуючі мітки
  existingCategories: string[] = []; // Існуючі категорії
  selectedLabel: string = ''; // Обрана мітка для нотатки. Використовується для додавання мітки до обраної нотатки.
  selectedCategory: string = ''; // Обрана категорія для нотатки. Використовується для додавання категорії до обраної нотатки.
  editMode: boolean = false; // Режим редагування
  editIndex: number | null = null; // Індекс нотатки, яку редагують
  notes: Note[] = []; // Масив нотаток

  // Конструктор компонента
  constructor(
    public dialogRef: MatDialogRef<CreateNoteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Ініціалізація властивостей з даних, переданих у конструктор
    this.newNote = { ...data.newNote };
    this.existingLabels = data.existingLabels || [];
    this.existingCategories = data.existingCategories || [];
  }

  // Додавання нової нотатки
  addNote() {
    this.newNote.labels.push(this.selectedLabel);
    this.newNote.categories.push(this.selectedCategory);

    const newNoteCopy = { ...this.newNote };
    this.dialogRef.close(newNoteCopy);
  }

  // Скасування створення нотатки
  cancel() {
    this.newNote = { title: '', text: '', color: 'white', labels: [], categories: [] };
    this.selectedLabel = '';
    this.selectedCategory = '';

    this.dialogRef.close();
  }

  // Оновлення існуючої нотатки
  updateNote() {
    if (this.editIndex !== null) {
      const updatedNote = { ...this.newNote };
      this.notes[this.editIndex] = updatedNote;
      this.saveNotesToLocalStorage();
      this.editIndex = null;
      this.newNote = { title: '', text: '', color: 'white', labels: [], categories: [] };
    }
  }

  // Збереження нотаток у локальне сховище
  private saveNotesToLocalStorage() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem('notes', JSON.stringify(this.notes));
        console.log('Notes saved to local storage:', this.notes);
      } catch (error) {
        console.error('Error saving notes to LocalStorage:', error);
      }
    }
  }
}

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [CreateNoteModalComponent],
  exports: [CreateNoteModalComponent],
})
export class CreateNoteModalModule {}