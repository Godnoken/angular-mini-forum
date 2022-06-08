import { Component, OnInit } from '@angular/core';

import { Thread } from 'src/app/interfaces/thread-interface';
import { CommentsService } from 'src/app/services/comments.service';
import { SharedService } from 'src/app/services/shared.service';
import { ThreadService } from 'src/app/services/thread.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.scss']
})
export class ThreadsComponent implements OnInit {
  public threads: Thread[] = [];

  constructor(
    public threadService: ThreadService,
    public userService: UserService,
    public commentService: CommentsService,
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.getThreads();
  }

  getThreads(): void {
    this.threadService.getThreads()
      .subscribe(threads => {
        this.threads = threads.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      });
  }

  handleCreateThreadDisplay(): void {
    if (this.threadService.isCreatingThread === false) {
      this.threadService.isCreatingThread = true;
      this.sharedService.isDoingAction = true;
    } else {
      this.threadService.isCreatingThread = false;
      this.sharedService.isDoingAction = false;
    }
  }

  deleteThread(threadToDelete: Thread): void {
    this.threads = this.threads.filter(thread => thread.id !== threadToDelete.id);
  }
}
