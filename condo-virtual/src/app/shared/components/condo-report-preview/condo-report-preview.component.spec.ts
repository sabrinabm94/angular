import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondoReportPreviewComponent } from './condo-report-preview.component';

describe('CondoReportPreviewComponent', () => {
  let component: CondoReportPreviewComponent;
  let fixture: ComponentFixture<CondoReportPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CondoReportPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CondoReportPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
