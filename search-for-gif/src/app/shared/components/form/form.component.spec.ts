import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule, FormGroup, Validators, FormControl } from '@angular/forms';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply the correct class and ID to the form element', () => {
    component.class = 'class';
    component.id = 'id';
    fixture.detectChanges();

    const formElement = fixture.debugElement.query(By.css('form'));

    expect(formElement.nativeElement.classList).toContain(component.class);
    expect(formElement.nativeElement.getAttribute('id')).toBe(component.id);
  });

  it('should set the correct name attribute on the form element', () => {
    component.name = 'test-form-name';
    fixture.detectChanges();

    const formElement = fixture.debugElement.query(By.css('form'));
    expect(formElement.nativeElement.getAttribute('name')).toBe('test-form-name');
  });

  it('should create and reset the form', () => {
    const formGroup = component.createForm();
    expect(formGroup).toBeTruthy();
    expect(formGroup.value).toEqual({});

    component.form = formGroup;
    const resetFormGroup = component.createForm();
    expect(resetFormGroup.value).toEqual({});
  });
});
