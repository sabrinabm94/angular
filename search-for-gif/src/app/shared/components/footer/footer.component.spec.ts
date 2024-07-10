import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent] // Importa o componente standalone
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply the correct class to the footer element', () => {
    const footerElement = fixture.debugElement.query(By.css('footer'));
    expect(footerElement.nativeElement.classList).toContain('footer');
  });

  it('should display the correct content', () => {
    const smallElement = fixture.debugElement.query(By.css('small'));
    const linkElement = fixture.debugElement.query(By.css('a'));

    expect(smallElement.nativeElement.textContent.trim()).toContain('Developed by Sabrina B.');
    expect(linkElement.nativeElement.getAttribute('href')).toBe('https://linkedin.com/in/sabrinabm94');
    expect(linkElement.nativeElement.textContent.trim()).toBe('Sabrina B.');
  });

  it('should contain the correct copyright text', () => {
    const smallElement = fixture.debugElement.query(By.css('small'));

    expect(smallElement.nativeElement.textContent.trim()).toContain('© 2024 - All Rights Reserved');
  });
});
