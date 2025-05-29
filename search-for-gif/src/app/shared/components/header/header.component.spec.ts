import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Component } from '@angular/core';

@Component({
  selector: 'test-host-component',
  template: `
    <app-header>
      <h1 class="test-content">Test Header Content</h1>
    </app-header>
  `
})
class TestHostComponent {}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [HeaderComponent],
      }).compileComponents();
    });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render ng-content correctly', () => {
    const hostElement: HTMLElement = hostFixture.nativeElement;
    const containerElement = hostElement.querySelector('.container');
    expect(containerElement).toBeTruthy();

    const contentElement = containerElement?.querySelector('.test-content');
    expect(contentElement).toBeTruthy();
    expect(contentElement?.textContent?.trim()).toBe('Test Header Content');
  });
});
