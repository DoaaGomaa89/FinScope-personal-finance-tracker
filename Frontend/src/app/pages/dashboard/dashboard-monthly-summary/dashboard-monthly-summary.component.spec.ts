import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMonthlySummaryComponent } from './dashboard-monthly-summary.component';

describe('DashboardMonthlySummaryComponent', () => {
  let component: DashboardMonthlySummaryComponent;
  let fixture: ComponentFixture<DashboardMonthlySummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMonthlySummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardMonthlySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
