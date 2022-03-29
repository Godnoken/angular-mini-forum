import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-thread-bottom-navigation',
  templateUrl: './thread-bottom-navigation.component.html',
  styleUrls: ['./thread-bottom-navigation.component.scss']
})
export class ThreadBottomNavigationComponent implements OnInit {
  @Input() isCreatingComment?: boolean;
  @Output() onShowCreateComment: EventEmitter<Comment> = new EventEmitter();
  @Output() onDeleteCreateComment: EventEmitter<Comment> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  handleCreateCommentDisplay(): void {
    if (this.isCreatingComment === false) {
      this.onShowCreateComment.emit();
    } else {
      this.onDeleteCreateComment.emit();
    }
  }
}
