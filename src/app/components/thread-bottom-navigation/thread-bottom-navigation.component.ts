import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';

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
    public commentService: CommentsService
  ) { }

  ngOnInit(): void {
  }

  handleCreateCommentDisplay(): void {
    if (this.commentService.isCreatingComment === false) {
      this.commentService.isCreatingComment = true;
    } else {
      this.commentService.isCreatingComment = false;
      this.commentService.isQuoting = false; 
    }
    
    this.isCreatingCommentChange.emit(this.isCreatingComment);
  }
}
