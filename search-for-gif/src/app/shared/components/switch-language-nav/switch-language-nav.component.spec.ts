import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwitchLanguageNavComponent } from './switch-language-nav.component';
import { LanguageService } from '../../../core/services/language.service';
import { Language } from '../../../data/interfaces/language.interface';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';

const mockLanguages: Language[] = [
  {
    initials: 'en',
    name: 'English',
    id: 0,
  },
  {
    initials: 'pt',
    name: 'Português',
    id: 1,
  },
];

const mockLanguageService = {
  getLanguagesList: jasmine
    .createSpy('getLanguagesList')
    .and.returnValue(mockLanguages),
  getActiveLanguage: jasmine
    .createSpy('getActiveLanguage')
    .and.returnValue(mockLanguages[0]),
  setActiveLanguage: jasmine.createSpy('setActiveLanguage'),
};

describe('SwitchLanguageNavComponent', () => {
  let component: SwitchLanguageNavComponent;
  let fixture: ComponentFixture<SwitchLanguageNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchLanguageNavComponent, CommonModule, TranslocoModule],
      providers: [{ provide: LanguageService, useValue: mockLanguageService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchLanguageNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize currentLanguage and languagensList from service', () => {
    expect(mockLanguageService.getLanguagesList).toHaveBeenCalled();
    expect(mockLanguageService.getActiveLanguage).toHaveBeenCalled();
    expect(component.languagensList).toEqual(mockLanguages);
    expect(component.currentLanguage).toEqual(mockLanguages[0]);
  });

  it('should switch language and update currentLanguage', () => {
    const newLanguage = mockLanguages[1];
    const result = component.switchLanguage(newLanguage);

    expect(mockLanguageService.setActiveLanguage).toHaveBeenCalledWith(
      newLanguage
    );
    expect(component.currentLanguage).toEqual(newLanguage);
    expect(result).toEqual(newLanguage);
  });

  it('should return null when switching to a null language', () => {
    const result = component.switchLanguage(null as any);
    expect(result).toBeNull();
    expect(mockLanguageService.setActiveLanguage).not.toHaveBeenCalled();
  });

  it('should return true for isActive when language is current', () => {
    expect(component.isActive(mockLanguages[0])).toBeTrue();
  });

  it('should return false for isActive when language is not current', () => {
    expect(component.isActive(mockLanguages[1])).toBeFalse();
  });
});
