import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteLinkComponent } from './route-link.component';

describe('RouteLinkComponent', () => {
  let component: RouteLinkComponent;
  let fixture: ComponentFixture<RouteLinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RouteLinkComponent]
    });
    fixture = TestBed.createComponent(RouteLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
