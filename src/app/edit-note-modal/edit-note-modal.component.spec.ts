import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNoteModalComponent } from './edit-note-modal.component';

describe('EditNoteModalComponent', () => {
  let component: EditNoteModalComponent;
  let fixture: ComponentFixture<EditNoteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditNoteModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditNoteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
