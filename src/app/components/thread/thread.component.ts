import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Comment } from 'src/app/interfaces/comment-interface';
import { Thread } from 'src/app/interfaces/thread-interface';
import { CommentsService } from 'src/app/services/comments.service';
import { ThreadService } from 'src/app/services/thread.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {
  public comments!: Comment[];
  public threadId!: number;
  public thread!: Thread;

  constructor(
    private route: ActivatedRoute,
    public commentService: CommentsService,
    private threadService: ThreadService
  ) { }

  ngOnInit(): void {
    this.threadId = Number(this.route.snapshot.paramMap.get("id"));
    this.getComments();
    this.getThread();
  }

  getComments(): void {
    this.commentService.getComments(this.threadId)
      .subscribe(comments => {
        this.comments = comments
      })
  }

  getThread(): void {
    this.threadService.getThread(this.threadId)
      .subscribe(thread => this.thread = thread);
  }

  deleteComment(commentToDelete: Comment): void {
    this.comments = this.comments.filter(comment => comment.id !== commentToDelete.id);
  }
}
