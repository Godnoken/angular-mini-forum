import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/interfaces/comment-interface';

import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {
  public comments!: Comment[];
  public threadId!: number;

  constructor(
    private route: ActivatedRoute,
    public commentService: CommentsService
  ) { }

  ngOnInit(): void {
    this.threadId = Number(this.route.snapshot.paramMap.get("id"));
    this.getComments();
  }

  getComments(): void {
    this.commentService.getComments(this.threadId)
      .subscribe(comments => {
        this.comments = comments
      })
  }

  deleteComment(commentToDelete: Comment): void {
    this.comments = this.comments.filter(comment => comment !== commentToDelete);
  }
}
