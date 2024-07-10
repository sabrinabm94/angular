import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent] // Importando o componente standalone
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply the correct class to the button', () => {
    component.class = 'extra-class';
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.classList).toContain('button');
    expect(buttonElement.nativeElement.classList).toContain('btn');
    expect(buttonElement.nativeElement.classList).toContain('btn-primary');
    expect(buttonElement.nativeElement.classList).toContain('extra-class');
  });

  it('should set the correct ID for the button', () => {
    component.class = 'test-class';
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.id).toBe('button-test-class');
  });

  it('should display the correct text', () => {
    component.text = 'Click Me!';
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.textContent.trim()).toBe('Click Me!');
  });

    it('should not apply the disabled attribute when disabled is false', () => {
      component.disabled = false;
      fixture.detectChanges();

      const buttonElement = fixture.debugElement.query(By.css('button'));
      expect(buttonElement.nativeElement.disabled).toBe(false);
    });
});
