import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';

import { CommentsService } from 'src/app/services/comments.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-thread-bottom-navigation',
  templateUrl: './thread-bottom-navigation.component.html',
  styleUrls: ['./thread-bottom-navigation.component.scss']
})
export class ThreadBottomNavigationComponent implements OnInit {
  @Input() isCreatingComment?: boolean;
  @Output() isCreatingCommentChange = new EventEmitter<boolean>();
  @Input() threadId!: number;
  @Input() rows!: number;
  @Input() currentPage!: number;
  @Output() currentPageChange = new EventEmitter<number>();
  @Input() pageButtons!: number[];
  @Input() pageCount!: number;
  @Input() newComments!: any;
  @Output() requestNewComments = new EventEmitter();

  constructor(
    public userService: UserService,
    public commentService: CommentsService,
    public sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  emitRequestNewComments(): void {
    this.requestNewComments.emit(false);
  }

  handleCreateCommentDisplay(): void {
    if (this.commentService.isCreatingComment === false) {
      this.commentService.isCreatingComment = true;
      this.sharedService.isDoingAction = true;
    } else {
      this.commentService.isCreatingComment = false;
      this.commentService.isQuoting = false;
      this.sharedService.isDoingAction = false;
    }
    
    this.isCreatingCommentChange.emit(this.isCreatingComment);
  }

  navigateByNumbers(event: any): void {
    if (event.target.nodeName === "LI") {
      this.currentPage = Number(event.target.textContent);
      this.currentPageChange.emit(this.currentPage);
      this.navigateToUrl();
    }
  }

  navigateByButtons(event: any): void {
    if (event.target.textContent === "Next") {
      this.currentPage++;
      this.currentPageChange.emit(this.currentPage);
      this.navigateToUrl();
    } 
    else if (event.target.textContent === "Previous") {
      this.currentPage--;
      this.currentPageChange.emit(this.currentPage);
      this.navigateToUrl();
    }
  }

  navigateToUrl(): void {
    this.router.navigateByUrl(`forum/thread/${this.threadId}/${this.currentPage}`);
  }
}
