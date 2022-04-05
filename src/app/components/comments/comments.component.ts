import { Component, OnInit } from '@angular/core';

import { Comment } from 'src/app/interfaces/comment-interface';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  public comments: Comment[] = [];
  public isCreatingComment: boolean = false;

  constructor(
    private commentService: CommentsService
  ) {
  }

  ngOnInit(): void {
    this.getComments();
  }

  getComments(): void {
    this.commentService.getCommentsFromDb()
      .subscribe(comments => {
        this.comments = comments
      })
  }
}
