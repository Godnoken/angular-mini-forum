import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { Comment } from 'src/app/interfaces/comment-interface';
import { User } from 'src/app/interfaces/user-interface';
import { CommentsService } from 'src/app/services/comments.service';
import { UserService } from 'src/app/services/user.service';
import { EditCommentComponent } from '../edit-comment/edit-comment.component';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {
  @ViewChild(EditCommentComponent)
  public edit!: EditCommentComponent;
  @Input() comment!: Comment;
  public user!: User;

  constructor(
    public userService: UserService,
    private commentService: CommentsService
  ) { }

  ngOnInit(): void {
    this.userService.getUser(this.comment.userId)
      .subscribe(user => this.user = user)
  }

  editComment(comment: Comment): void {
    comment.isEditing = true;
    if (comment) {
      this.commentService.updateComment(comment)
        .subscribe();
    }
  }

  replyComment(comment: Comment): void {

  }
}
