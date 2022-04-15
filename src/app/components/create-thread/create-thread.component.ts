import { Component, OnInit, Renderer2} from '@angular/core';
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
    content: new FormControl("", {
      validators: [
        Validators.required,
        Validators.minLength(20)
      ]
    })
  })

  ngOnInit(): void {
  }

  createThread(): void {
    if (this.threadForm.valid) {
      const thread: Thread = {
        title: this.threadForm.get("title")!.value,
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
      content: this.threadForm.get("content")!.value,
      isFirstComment: true
    }

    this.commentService.addComment(comment)
      .subscribe(() => {
        this.router.navigateByUrl(`/thread/${this.threadId}`)
      });
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

  addToHiddenInput(): void {
    const content = this.renderer.selectRootElement(".add-comment-content", true);

    this.threadForm.get("content")!.setValue(content.textContent);
  }
}
