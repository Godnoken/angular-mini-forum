import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Comment } from 'src/app/interfaces/comment-interface';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {
  @Input() comment!: Comment;
  @Output() onEdit: EventEmitter<Comment> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  editComment(comment: Comment): void {
    this.onEdit.emit(comment);
  }
}
