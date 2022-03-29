import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadBottomNavigationComponent } from './thread-bottom-navigation.component';

describe('ThreadBottomNavigationComponent', () => {
  let component: ThreadBottomNavigationComponent;
  let fixture: ComponentFixture<ThreadBottomNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreadBottomNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadBottomNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
