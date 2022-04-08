import { Component, OnInit } from '@angular/core';

import { Thread } from 'src/app/interfaces/thread-interface';
import { ThreadService } from 'src/app/services/thread.service';

@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.scss']
})
export class ThreadsComponent implements OnInit {
  public threads: Thread[] = [];

  constructor(
    private threadService: ThreadService
  ) { }

  ngOnInit(): void {
    this.getThreads();
  }

  getThreads(): void {
    this.threadService.getThreads()
      .subscribe(threads => this.threads = threads);
  }
}
