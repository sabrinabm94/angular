import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { Component } from '@angular/core';

@Component({
  selector: 'test-host-component',
  template: `
    <app-footer>
      <p class="test-content">Test Content</p>
    </app-footer>
  `
})
class TestHostComponent {}

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent, TestHostComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have app-footer class as host binding', () => {
    const hostElement: HTMLElement = fixture.nativeElement;
    expect(hostElement.classList.contains('app-footer')).toBe(true);
  });

  it('should render ng-content correctly', () => {
    const hostElement: HTMLElement = hostFixture.nativeElement;
    const containerElement = hostElement.querySelector('.container');
    expect(containerElement).toBeTruthy();

    const hrElement = containerElement?.querySelector('hr');
    expect(hrElement).toBeTruthy();

    const contentElement = containerElement?.querySelector('.test-content');
    expect(contentElement).toBeTruthy();
    expect(contentElement?.textContent?.trim()).toBe('Test Content');
  });
});
