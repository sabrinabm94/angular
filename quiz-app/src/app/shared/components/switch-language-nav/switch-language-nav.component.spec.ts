import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwitchLanguageNavComponent } from './switch-language-nav.component';
import { LanguageService } from '../../../core/services/language.service';
import { ChangeDetectionStrategy } from '@angular/core';

describe('SwitchLanguageNavComponent', () => {
  let component: SwitchLanguageNavComponent;
  let fixture: ComponentFixture<SwitchLanguageNavComponent>;
  let mockLanguageService: jasmine.SpyObj<LanguageService>;

  beforeEach(async () => {
    // Cria o mock para LanguageService
    mockLanguageService = jasmine.createSpyObj('LanguageService', ['switchLanguage']);

    await TestBed.configureTestingModule({
      declarations: [SwitchLanguageNavComponent],
      providers: [
        { provide: LanguageService, useValue: mockLanguageService }
      ]
    })
    .overrideComponent(SwitchLanguageNavComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default } // Evita problemas com OnPush
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchLanguageNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should switch language using LanguageService', () => {
    const language = 'en';

    // Chama o método switchLanguage do componente
    component.switchLanguage(language);

    // Verifica se o método switchLanguage foi chamado com o idioma correto
    expect(mockLanguageService.switchLanguage).toHaveBeenCalledWith(language);
  });
});
