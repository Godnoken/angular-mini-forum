import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { CommentsService } from 'src/app/services/comments.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';
import { Comment } from 'src/app/interfaces/comment-interface';

@Component({
  selector: 'app-thread-bottom-navigation',
  templateUrl: './thread-bottom-navigation.component.html',
  styleUrls: ['./thread-bottom-navigation.component.scss']
})
export class ThreadBottomNavigationComponent implements OnInit {
  @Input() isCreatingComment?: boolean;
  @Output() isCreatingCommentChange = new EventEmitter<boolean>();
  @Input() rows!: number;
  @Input() currentPage!: number;
  @Output() currentPageChange = new EventEmitter<number>();
  @Input() comments!: Comment[];
  public pageButtons: number[] = [];
  public pageCount!: number;

  constructor(
    public userService: UserService,
    public commentService: CommentsService,
    public sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.setupPagination(this.comments, this.rows);
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

  setupPagination(items: any, rowsPerPage: any) {
    
    this.pageCount = Math.ceil(items.length / rowsPerPage);

    for (let i = 1; i < this.pageCount + 1; i++) {
      this.pageButtons.push(i);
    }
  }

  navigateByNumbers(event: any): void {
    if (event.target.nodeName === "LI") {
      this.currentPage = Number(event.target.textContent);
      this.currentPageChange.emit(this.currentPage);
    }
  }

  navigateByButtons(event: any): void {
    if (event.target.textContent === "Next") {
      this.currentPage++;
      this.currentPageChange.emit(this.currentPage);
    } 
    else if (event.target.textContent === "Previous") {
      this.currentPage--;
      this.currentPageChange.emit(this.currentPage);
    }
  }
}
