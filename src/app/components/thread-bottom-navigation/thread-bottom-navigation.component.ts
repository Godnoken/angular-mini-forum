import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

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
    public userService: UserService
  ) { }

  ngOnInit(): void {
  }

  handleCreateCommentDisplay(): void {
    if (this.isCreatingComment === false) {
      this.isCreatingComment = true;
    } else {
      this.isCreatingComment = false;
    }
    
    this.isCreatingCommentChange.emit(this.isCreatingComment);
  }
}
