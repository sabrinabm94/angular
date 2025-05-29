import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly bind id, class, and text', () => {
    component.id = 'test-id';
    component.class = 'custom-class';
    component.text = 'Click Me';

    fixture.detectChanges();
    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');

    expect(buttonElement).toBeTruthy();
    expect(buttonElement.id).toBe('button-custom-class');
    expect(buttonElement.className).toContain('button');
    expect(buttonElement.className).toContain('btn');
    expect(buttonElement.className).toContain('btn-primary');
    expect(buttonElement.innerText.trim()).toBe('Click Me');
  });

  it('should bind form and disabled attributes', () => {
    component.form = 'form1';
    component.disabled = true;

    fixture.detectChanges();
    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');

    expect(buttonElement.getAttribute('form')).toBe('form1');
    expect(buttonElement.disabled).toBe(true);
  });

  it('should have app-button class as host binding', () => {
    const hostElement: HTMLElement = fixture.nativeElement;

    expect(hostElement.classList.contains('app-button')).toBe(true);
  });
});
