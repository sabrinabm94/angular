import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  const defaultCssClasName: string = 'button';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  it('should bind form and disabled attributes', () => {
    component.disabled = true;
    fixture.detectChanges();

    const buttonElement: HTMLButtonElement = fixture.debugElement.query(
      By.css(defaultCssClasName)
    ).nativeElement;

    expect(buttonElement.disabled).toBeTrue();
  });
});
