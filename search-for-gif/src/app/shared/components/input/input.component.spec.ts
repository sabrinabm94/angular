import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { By } from '@angular/platform-browser';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent], // Importa o InputComponent
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label with correct class and id', () => {
    component.class = 'custom-class';
    fixture.detectChanges();

    const labelElement = fixture.debugElement.query(By.css('label'));

    expect(labelElement).toBeTruthy();
    expect(labelElement.nativeElement.classList).toContain('label');
    expect(labelElement.nativeElement.classList).toContain('custom-class');
    expect(labelElement.nativeElement.getAttribute('id')).toBe('label-custom-class');
  });

  it('should render input with correct attributes', () => {
    component.class = 'custom-class';
    component.name = 'username';
    component.pattern = '[a-zA-Z]+';
    component.placeholder = 'Enter your username';
    component.required = true;
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(By.css('input'));

    expect(inputElement).toBeTruthy();
    expect(inputElement.nativeElement.classList).toContain('input');
    expect(inputElement.nativeElement.classList).toContain('form-control');
    expect(inputElement.nativeElement.classList).toContain('custom-class');
    expect(inputElement.nativeElement.getAttribute('id')).toBe('input-custom-class');
    expect(inputElement.nativeElement.getAttribute('name')).toBe('username');
    expect(inputElement.nativeElement.getAttribute('placeholder')).toBe('Enter your username');
    expect(inputElement.nativeElement.getAttribute('pattern')).toBe('[a-zA-Z]+');
    expect(inputElement.nativeElement.hasAttribute('required')).toBeTrue();
  });
});
