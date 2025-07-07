import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTransactionModalComponent } from './edit-transaction-modal.component';

describe('EditTransactionModalComponent', () => {
  let component: EditTransactionModalComponent;
  let fixture: ComponentFixture<EditTransactionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTransactionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTransactionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
