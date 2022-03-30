import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteCommentComponent } from './quote-comment.component';

describe('QuoteCommentComponent', () => {
  let component: QuoteCommentComponent;
  let fixture: ComponentFixture<QuoteCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
