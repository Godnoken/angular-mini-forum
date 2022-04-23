import { Component, OnInit, Renderer2 } from '@angular/core';
import { finalize } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';
import { CommentsService } from 'src/app/services/comments.service';
import { ThreadService } from 'src/app/services/thread.service';
import { Thread } from 'src/app/interfaces/thread-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-thread',
  templateUrl: './create-thread.component.html',
  styleUrls: ['./create-thread.component.scss']
})
export class CreateThreadComponent implements OnInit {
  public threadId!: number;
  private textarea!: HTMLInputElement;

  constructor(
    private renderer: Renderer2,
    private userService: UserService,
    public commentService: CommentsService,
    private threadService: ThreadService,
    private router: Router
  ) { }

  threadForm = new FormGroup({
    title: new FormControl("", {
      validators: [
        Validators.required,
        Validators.minLength(5)
      ]
    }),
    comment: new FormControl("", {
      validators: [
        Validators.required,
        Validators.minLength(20)
      ]
    })
  }, { updateOn: "submit" });

  get comment() { return this.threadForm.get("comment")! };
  get title() { return this.threadForm.get("title")! };

  ngOnInit(): void {
    const titleInput = this.renderer.selectRootElement(".title-input", true);
    titleInput.focus();
  }

  createThread(): void {
    if (this.threadForm.valid) {
      const thread: Thread = {
        title: this.title.value,
        date: this.getCurrentDate(),
        userId: this.userService.loggedUserId,
        parentId: null
      }

      if (thread) {
        this.threadService.createThread(thread)
          .pipe(
            finalize(() => {
              this.createComment();
            })
          )
          .subscribe(thread => {
            this.threadId = thread.id!;
          });
      }
    }
  }

  createComment(): void {

    const comment: any = {
      threadId: this.threadId,
      parentId: null,
      userId: this.userService.loggedUserId,
      date: this.getCurrentDate(),
      content: this.comment.value,
      isFirstComment: true
    }

    this.commentService.addComment(comment)
      .subscribe(() => this.router.navigateByUrl(`forum/thread/${this.threadId}/1`));
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
    const textarea = this.renderer.selectRootElement(".comment-textarea", true);

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
}
