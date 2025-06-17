import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitReportPreviewComponent } from './unit-report-preview.component';

describe('UnitReportPreviewComponent', () => {
  let component: UnitReportPreviewComponent;
  let fixture: ComponentFixture<UnitReportPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitReportPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitReportPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
