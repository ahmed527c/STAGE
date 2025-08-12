import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundSwitcherComponent } from './background-switcher.component';

describe('BackgroundSwitcherComponent', () => {
  let component: BackgroundSwitcherComponent;
  let fixture: ComponentFixture<BackgroundSwitcherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackgroundSwitcherComponent]
    });
    fixture = TestBed.createComponent(BackgroundSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
