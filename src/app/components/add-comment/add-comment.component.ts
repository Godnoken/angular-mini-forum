import { Component, OnInit, Renderer2, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Comment } from 'src/app/interfaces/comment-interface';
import { CommentsService } from 'src/app/services/comments.service';
import { SharedService } from 'src/app/services/shared.service';
import { ThreadService } from 'src/app/services/thread.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  @Input() comments!: Comment[];
  @Input() threadId!: number;
  @Output() emitCreateThread = new EventEmitter<any>();

  constructor(
    private renderer: Renderer2,
    private userService: UserService,
    public commentService: CommentsService,
    private threadService: ThreadService,
    public sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  addComment(): void {
    const content = this.renderer.selectRootElement(".add-comment-content", true).textContent;

    const comment: any = {
      threadId: this.threadId,
      ...(this.commentService.isQuoting === true ? { parentId: this.commentService.comment!.id! } : { parentId: null }),
      userId: this.userService.loggedUserId,
      date: this.getCurrentDate(),
      content: content,
      isFirstComment: false,
      ...(this.commentService.isQuoting === true ? { quotedUserId: this.commentService.comment!.userId } : null),
      ...(this.commentService.isQuoting === true ? { quotedCommentContent: this.commentService.comment!.content } : null),
      ...(this.commentService.isQuoting === true ? { quotedCommentDate: this.commentService.comment!.date } : null)
    }

    if (comment && this.commentService.isCreatingComment === true) {
      this.commentService.addComment(comment)
        .subscribe(comment => this.comments.push(comment));
    } else {
      comment.isFirstComment = true;
      this.commentService.addComment(comment)
        .subscribe(() => {
          this.router.navigateByUrl(`/thread/${this.threadId}`)
        });
    }

    this.threadService.isCreatingThread = false;
    this.commentService.isCreatingComment = false;
    this.commentService.isQuoting = false;
    this.sharedService.isDoingAction = false;
  }

  addThreadCreatorComment(): void {
    this.emitCreateThread.emit();
  }

  getCurrentDate(): string {
    const currentDate = new Date();

    const date = currentDate.toLocaleDateString("en-SE", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })

    return date;
  }
}
