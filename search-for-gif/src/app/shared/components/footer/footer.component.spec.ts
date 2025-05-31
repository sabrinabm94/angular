import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  const defaultCssClassName: string = 'footer';
  const defaultCssClassNameChild: string = 'footer .container hr';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the footer component', () => {
    expect(component).toBeTruthy();
  });

  it('should render a <footer> element', () => {
    const footerEl = fixture.nativeElement.querySelector(defaultCssClassName);
    expect(footerEl).toBeTruthy();
  });

  it('should contain an <hr> tag inside the container', () => {
    const hrEl = fixture.nativeElement.querySelector(defaultCssClassNameChild);
    expect(hrEl).toBeTruthy();
  });
});
