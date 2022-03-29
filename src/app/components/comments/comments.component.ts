import { Component, Input, OnInit } from '@angular/core';

import { Comment } from 'src/app/interfaces/comment-interface';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments: Comment[] = [];
  public isCreatingComment?: boolean = false;

  constructor(
    private commentService: CommentsService,
  ) { }

  ngOnInit(): void {
    this.getComments();
  }

  getComments(): void {
    this.commentService.getCommentsFromDb()
      .subscribe(comments => this.comments = comments);
  }

  editComment(comment: Comment): void {
    comment.isEditing = true;
    if (comment) {
      this.commentService.updateComment(comment)
        .subscribe();
    }
  }

  displayCreateComment(): void {
    this.isCreatingComment = true;
  }

  deleteCreateComment(): void {
    this.isCreatingComment = false;
  }

  addComment(comment: Comment): void {
    this.commentService.addComment(comment)
      .subscribe(comment => this.comments.push(comment));
    this.isCreatingComment = false;
  }
}
