import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
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

  constructor(
    public userService: UserService,
    public commentService: CommentsService,
    public sharedService: SharedService
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
}
