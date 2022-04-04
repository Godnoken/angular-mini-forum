import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Comment } from 'src/app/interfaces/comment-interface';
import { User } from 'src/app/interfaces/user-interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {
  @Input() comment!: Comment;
  @Input() users!: User[];
  @Output() onEdit: EventEmitter<Comment> = new EventEmitter();

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
  }

  editComment(comment: Comment): void {
    this.onEdit.emit(comment);
  }

  replyComment(comment: Comment): void {

  }
}
