import { Component, OnInit, Renderer2, Output, EventEmitter } from '@angular/core';

import { Comment } from 'src/app/interfaces/comment-interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  @Output() onAddComment: EventEmitter<Comment> = new EventEmitter();

  constructor(
    private renderer: Renderer2,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  addComment(): void {
    const content = this.renderer.selectRootElement(".add-comment-content", true).textContent;

    const comment = {
      threadId: 2,
      parentId: 2,
      userId: this.userService.loggedUserId,
      date: this.getCurrentDate(),
      content: content,
      isEditing: false
    }

    this.onAddComment.emit(comment);
  }

  getCurrentDate(): string {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    return `${hours}:${minutes}  ${year}/${month}/${day}`;
  }
}
