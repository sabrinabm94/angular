import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent], // Importa o HeaderComponent
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the header container correctly', () => {
    const headerElement = fixture.debugElement.query(By.css('header'));
    const containerElement = fixture.debugElement.query(By.css('.container'));

    // Verifica se o elemento <header> está presente
    expect(headerElement).toBeTruthy();

    // Verifica se o elemento <div class="container"> está presente dentro do <header>
    expect(containerElement).toBeTruthy();

    // Opcional: Verifica se o container está dentro do header
    expect(headerElement.nativeElement.contains(containerElement.nativeElement)).toBeTrue();
  });
});
