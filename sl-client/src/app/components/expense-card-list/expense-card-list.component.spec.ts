import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseCardListComponent } from './expense-card-list.component';

describe('ExpenseCardListComponent', () => {
  let component: ExpenseCardListComponent;
  let fixture: ComponentFixture<ExpenseCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
