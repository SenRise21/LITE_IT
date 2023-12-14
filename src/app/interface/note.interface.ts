// Інтерфейс, що представляє структуру об'єкта нотатки (Note)
export interface Note {
  index?: number;           // Опціональний індекс нотатки (використовується, наприклад, при редагуванні)
  title: string;            // Заголовок нотатки
  text: string;             // Текст нотатки
  color: string;            // Колір нотатки
  labels: string[];         // Масив міток (ярликів), пов'язаних з нотаткою
  categories: string[];     // Масив категорій, пов'язаних з нотаткою
  showFullText?: boolean;   // Опціональний флаг, що вказує, чи слід відображати повний текст нотатки
}

// Інтерфейс, що представляє результат операції додавання чи редагування нотатки
export interface AddEditNoteResult {
  index?: number;  // Опціональний індекс нотатки у масиві (використовується, наприклад, при редагуванні)
  note: Note;      // Об'єкт нотатки, що представляє додану або відредаговану нотатку
}