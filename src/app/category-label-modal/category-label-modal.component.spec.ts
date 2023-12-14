import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryLabelModalComponent } from './category-label-modal.component';

describe('CategoryLabelModalComponent', () => {
  let component: CategoryLabelModalComponent;
  let fixture: ComponentFixture<CategoryLabelModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryLabelModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryLabelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
