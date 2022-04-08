import { Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { CommentsService } from 'src/app/services/comments.service';
import { AddCommentComponent } from '../add-comment/add-comment.component';
import { ThreadService } from 'src/app/services/thread.service';
import { Thread } from 'src/app/interfaces/thread-interface';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-create-thread',
  templateUrl: './create-thread.component.html',
  styleUrls: ['./create-thread.component.scss']
})
export class CreateThreadComponent implements OnInit {
  @ViewChild(AddCommentComponent)
  private add!: AddCommentComponent;
  public threadId!: number;

  constructor(
    private renderer: Renderer2,
    private userService: UserService,
    public commentService: CommentsService,
    private threadService: ThreadService
  ) { }

  ngOnInit(): void {
  }

  createThread(): void {
    const title = this.renderer.selectRootElement(".create-title", true).value;

    const thread = {
      title: title,
      date: this.add.getCurrentDate(),
      userId: this.userService.loggedUserId,
      parentId: null,
    }

    if (thread) {
      this.threadService.createThread(thread)
        .pipe(
          finalize(() => {
            setTimeout(() => {
              this.add.addComment();
            }, 10)
          })
        )
        .subscribe(thread => {
          this.threadId = thread.id!;
        });
    }
  }
}
