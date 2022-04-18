import { Component, OnInit, Renderer2, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Comment } from 'src/app/interfaces/comment-interface';
import { CommentsService } from 'src/app/services/comments.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  @Input() comments!: Comment[];
  @Input() paginatedComments!: Comment[];
  @Input() currentPage!: number;
  @Output() currentPageChange = new EventEmitter();
  @Input() threadId!: number;
  @Input() pageCount!: number;
  @Output() pageCountChange = new EventEmitter();
  @Input() rows!: number;
  private textarea!: HTMLInputElement;

  constructor(
    private renderer: Renderer2,
    private userService: UserService,
    public commentService: CommentsService,
    public sharedService: SharedService,
    private router: Router
  ) { }

  commentForm = new FormGroup({
    comment: new FormControl("", {
      validators: [
        Validators.required,
        Validators.minLength(3)
      ],
    })
  }, { updateOn: "submit" });

  get comment() { return this.commentForm.get("comment")! };

  ngOnInit(): void {
    setTimeout(() => {
      this.textarea = this.renderer.selectRootElement(".comment-textarea", true);
      this.textarea.focus();
    }, 25);
  }

  addComment(): void {
    if (this.commentForm.valid) {
      const comment: any = {
        threadId: this.threadId,
        ...(this.commentService.isQuoting === true ? { parentId: this.commentService.comment!.id! } : { parentId: null }),
        userId: this.userService.loggedUserId,
        date: this.getCurrentDate(),
        content: this.comment.value,
        isFirstComment: false,
        ...(this.commentService.isQuoting === true ? { quotedUserId: this.commentService.comment!.userId } : null),
        ...(this.commentService.isQuoting === true ? { quotedCommentContent: this.commentService.comment!.content } : null),
        ...(this.commentService.isQuoting === true ? { quotedCommentDate: this.commentService.comment!.date } : null)
      }

      if (comment && this.commentService.isCreatingComment === true) {
        this.commentService.addComment(comment)
          .subscribe(comment => {
            this.comments.push(comment);

            // If no more comments can fit on page
            if (this.paginatedComments.length >= this.rows) {
              // Go to the last page on thread
              if (Math.ceil(this.comments.length / this.rows) <= this.pageCount) {
                this.currentPage = this.pageCount;
                this.currentPageChange.emit(this.currentPage);
                this.router.navigateByUrl(`/thread/${this.threadId}/${this.pageCount}`);
              }
              // If last page is full, create new page in thread and go there
              else {
                this.pageCount++;
                this.pageCountChange.emit(this.pageCount);
                this.currentPage = this.pageCount;
                this.currentPageChange.emit(this.currentPage);
                this.router.navigateByUrl(`/thread/${this.threadId}/${this.pageCount}`);
              }
            }
            // If there is space, stay on the same page & push comment to screen
            else {
              this.paginatedComments.push(comment);
            }

            this.commentService.isCreatingComment = false;
            this.commentService.isQuoting = false;
            this.sharedService.isDoingAction = false;
          });
      }
    }
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

  autoGrowSize(): void {
    this.textarea.style.height = "auto";
    this.textarea.style.height = `${this.textarea.scrollHeight}px`;
  }
}
