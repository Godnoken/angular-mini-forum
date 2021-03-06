import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { CommentsService } from './services/comments.service';
import { SharedService } from './services/shared.service';
import { ThreadService } from './services/thread.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private commentsService: CommentsService,
    private threadService: ThreadService
  ) {
    this.subscribeToRouterNavigation();
    this.readColorThemeOnLoad();
  }


  readColorThemeOnLoad(): void {
    if (localStorage["theme"] === 'darkMode' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('darkMode')

    } else {
      document.documentElement.classList.remove('darkMode')
    }
  }


  subscribeToRouterNavigation(): void {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.sharedService.isDoingAction = false;
        this.commentsService.isCreatingComment = false;
        this.commentsService.isQuoting = false;
        this.threadService.isCreatingThread = false;
      }
    });
  }
}
