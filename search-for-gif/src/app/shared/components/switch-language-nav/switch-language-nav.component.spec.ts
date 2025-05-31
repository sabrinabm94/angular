import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwitchLanguageNavComponent } from './switch-language-nav.component';
import { LanguageService } from '../../../core/services/language.service';
import { Language } from '../../../data/interfaces/language.interface';
import { GetTranslocoTestingModule } from '../../../helpers/transloco-testing.module';

describe('SwitchLanguageNavComponent', () => {
  let component: SwitchLanguageNavComponent;
  let fixture: ComponentFixture<SwitchLanguageNavComponent>;
  let mockLanguageService: jasmine.SpyObj<LanguageService>;

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

  beforeEach(async () => {
    mockLanguageService = jasmine.createSpyObj('LanguageService', [
      'getLanguagesList',
      'getActiveLanguage',
      'setActiveLanguage',
    ]);

    mockLanguageService.getLanguagesList.and.returnValue(mockLanguages);
    mockLanguageService.getActiveLanguage.and.returnValue(mockLanguages[0]);

    await TestBed.configureTestingModule({
      imports: [SwitchLanguageNavComponent, GetTranslocoTestingModule()],
      providers: [{ provide: LanguageService, useValue: mockLanguageService }],
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchLanguageNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with languages list and active language', () => {
    expect(component.languagensList).toEqual(mockLanguages);
    expect(component.currentLanguage).toEqual(mockLanguages[0]);
  });

  it('should switch language when switchLanguage is called', () => {
    const newLanguage = mockLanguages[1];
    const result = component.switchLanguage(newLanguage);

    expect(mockLanguageService.setActiveLanguage).toHaveBeenCalledWith(
      newLanguage
    );
    expect(component.currentLanguage).toEqual(newLanguage);
    expect(result).toEqual(newLanguage);
  });

  it('should return null when switchLanguage is called with null', () => {
    const result = component.switchLanguage(null as unknown as Language);
    expect(result).toBeNull();
  });

  it('should return true if language is active', () => {
    expect(component.isActive(mockLanguages[0])).toBeTrue();
  });

  it('should return false if language is not active', () => {
    expect(component.isActive(mockLanguages[1])).toBeFalse();
  });
});
