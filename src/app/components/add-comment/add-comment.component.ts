import { Component, OnInit, Renderer2, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  @Input() threadId!: number;
  private textarea!: HTMLInputElement;

  constructor(
    private renderer: Renderer2,
    private userService: UserService,
    public commentService: CommentsService,
    public sharedService: SharedService,
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
          .subscribe(comment => this.comments.push(comment));
      }

      this.commentService.isCreatingComment = false;
      this.commentService.isQuoting = false;
      this.sharedService.isDoingAction = false;
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
