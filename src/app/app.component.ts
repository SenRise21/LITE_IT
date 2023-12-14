// app.component.ts

import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditNoteModalComponent } from './edit-note-modal/edit-note-modal.component';
import { CreateNoteModalComponent } from './create-note-modal/create-note-modal.component';
import { CategoryLabelModalComponent } from './category-label-modal/category-label-modal.component';
import { DetailsModalComponent } from './details-modal/details-modal.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { Note } from './interface/note.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule],
  animations: [
    // Анімація для з'явлення/зникнення
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class AppComponent {
  notes: Note[] = []; // Масив нотаток
  newNote: Note = { title: '', text: '', color: 'white', labels: [], categories: [], showFullText: false }; // Нова нотатка
  editIndex: number | null = null; // Індекс нотатки, яку редагують
  editMode: boolean = false; // Режим редагування
  showDetailsForNoteIndex: number | null = null; // Індекс нотатки, для якої відображаються деталі
  labelInput: string = ''; // Введене значення для мітки
  categoryInput: string = ''; // Введене значення для категорії
  existingLabels: string[] = []; // Існуючі мітки
  existingCategories: string[] = []; // Існуючі категорії
  newLabel: string = ''; // Нова мітка
  newCategory: string = ''; // Нова категорія
  isSidebarOpen: boolean = true; // Відкрита бічна панель
  isNewNoteModalOpen: boolean = false; // Відкрита модальна форма для нової нотатки

  constructor(@Inject(PLATFORM_ID) private platformId: Object, public dialog: MatDialog) {
    this.loadNotesFromLocalStorage(); // Завантаження нотаток з LocalStorage
    this.loadExistingLabelsAndCategories(); // Завантаження існуючих міток та категорій з LocalStorage
  }

  private loadNotesFromLocalStorage() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const storedNotes = localStorage.getItem('notes');
        this.notes = storedNotes ? JSON.parse(storedNotes) : [];
      } catch (error) {
        console.error('Помилка завантаження нотаток з LocalStorage:', error);
      }
    }
  }

  private loadExistingLabelsAndCategories() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const storedLabels = localStorage.getItem('existingLabels');
        this.existingLabels = storedLabels ? JSON.parse(storedLabels) : [];

        const storedCategories = localStorage.getItem('existingCategories');
        this.existingCategories = storedCategories ? JSON.parse(storedCategories) : [];
      } catch (error) {
        console.error('Помилка завантаження існуючих міток та категорій з LocalStorage:', error);
      }
    }
  }

  private saveNotesToLocalStorage() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem('notes', JSON.stringify(this.notes));
        console.log('Нотатки збережено в локальному сховищі:', this.notes);
      } catch (error) {
        console.error('Помилка збереження нотаток в LocalStorage:', error);
      }
    }
  }

  // Функція для редагування нотатки
  editNote(index: number) {
    this.editIndex = index;
    this.newNote = { ...this.notes[index] };
  }

  // Функція скасування редагування
  cancelEdit() {
    this.editIndex = null;
    this.newNote = { title: '', text: '', color: 'white', labels: [], categories: [], showFullText: false };
  }

  // Функція для видалення нотатки
  deleteNote(index: number) {
    if (confirm('Ви впевнені, що хочете видалити цю нотатку?')) {
      this.notes.splice(index, 1);
      this.saveNotesToLocalStorage();
    }
  }

  // Відкриття модального вікна для редагування нотатки
  openEditModal(index: number) {
    const dialogRef = this.dialog.open(EditNoteModalComponent, {
      data: {
        index,
        note: { ...this.notes[index] },
        addNote: this.addNoteFunction.bind(this, index),
        editMode: this.editMode,
        allLabels: this.existingLabels,
        allCategories: this.existingCategories,
      },
    });

    dialogRef.afterClosed().subscribe((result: Note) => {
      if (result) {
        this.notes[index] = { ...result };
        this.saveNotesToLocalStorage();
      }
    });
  }

  // Функція для редагування нотатки
  addNoteFunction(index: number, note: Note): void {
    const updatedNote = { ...note };
    this.notes[index] = updatedNote;
    this.saveNotesToLocalStorage();
  }

  // Перемикач відображення/сховання бічної панелі
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Відкриття модальної форми для створення нової нотатки
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateNoteModalComponent, {
      data: { newNote: { ...this.newNote }, existingLabels: this.existingLabels, existingCategories: this.existingCategories },
    });

    dialogRef.afterClosed().subscribe((result: Note) => {
      if (result) {
        this.notes.push(result);
        this.saveNotesToLocalStorage();
        this.newNote = { title: '', text: '', color: 'white', labels: [], categories: [], showFullText: false };
      }
    });
  }

  // Відкриття модального вікна для редагування міток та категорій
  openModal() {
    const dialogRef = this.dialog.open(CategoryLabelModalComponent, {
      data: {
        existingLabels: this.existingLabels,
        existingCategories: this.existingCategories,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Діалог закритий з результатом:', result);
    });
  }

  // Відкриття модального вікна для перегляду деталей нотатки
  openDetailsModal(index: number) {
    const dialogRef = this.dialog.open(DetailsModalComponent, {
      data: {
        note: { ...this.notes[index] },
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Діалог деталей закритий з результатом:', result);
    });
  }
}