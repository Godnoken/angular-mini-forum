import { Component, OnInit } from '@angular/core';

import { Thread } from 'src/app/interfaces/thread-interface';
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
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.getThreads();
  }

  getThreads(): void {
    this.threadService.getThreads()
      .subscribe(threads => this.threads = threads);
  }

  handleCreateThreadDisplay(): void {
    if (this.threadService.isCreatingThread === false) {
      this.threadService.isCreatingThread = true;
    } else {
      this.threadService.isCreatingThread = false;
    }
  }

  deleteThread(threadToDelete: Thread): void {
    this.threads = this.threads.filter(thread => thread !== threadToDelete);
  }
}
