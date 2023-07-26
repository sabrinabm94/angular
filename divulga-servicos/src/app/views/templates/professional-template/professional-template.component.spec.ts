import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalTemplateComponent } from './professional-template.component';

describe('ProfessionalTemplateComponent', () => {
  let component: ProfessionalTemplateComponent;
  let fixture: ComponentFixture<ProfessionalTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessionalTemplateComponent]
    });
    fixture = TestBed.createComponent(ProfessionalTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
