import { Component, OnInit, EventEmitter, Output, Input, Renderer2 } from '@angular/core';

import { CommentsService } from 'src/app/services/comments.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

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

  constructor(
    public userService: UserService,
    public commentService: CommentsService,
    public sharedService: SharedService,
    private router: Router,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
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

      this.router.navigateByUrl(`/thread/${this.threadId}/${this.currentPage}`);
    }
  }

  navigateByButtons(event: any): void {
    if (event.target.textContent === "Next") {
      this.currentPage++;
      this.currentPageChange.emit(this.currentPage);

      this.router.navigateByUrl(`/thread/${this.threadId}/${this.currentPage}`);
    } 
    else if (event.target.textContent === "Previous") {
      this.currentPage--;
      this.currentPageChange.emit(this.currentPage);
      this.router.navigateByUrl(`/thread/${this.threadId}/${this.currentPage}`);
    }
  }
}
