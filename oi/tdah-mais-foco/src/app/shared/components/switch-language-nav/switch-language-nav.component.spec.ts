import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchLanguageNavComponent } from './switch-language-nav.component';

describe('SwitchLanguageNavComponent', () => {
  let component: SwitchLanguageNavComponent;
  let fixture: ComponentFixture<SwitchLanguageNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchLanguageNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchLanguageNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
