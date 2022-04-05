import { Component, OnInit, Renderer2, Input, Output, EventEmitter } from '@angular/core';

import { Comment } from 'src/app/interfaces/comment-interface';
import { CommentsService } from 'src/app/services/comments.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  @Input() comments!: Comment[];
  @Input() isCreatingComment!: boolean;
  @Output() isCreatingCommentChange = new EventEmitter<boolean>();

  constructor(
    private renderer: Renderer2,
    private userService: UserService,
    private commentService: CommentsService
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

    if (comment) {
      this.commentService.addComment(comment)
        .subscribe(comment => this.comments.push(comment));
      this.isCreatingComment = false;
      this.isCreatingCommentChange.emit(this.isCreatingComment);
    }
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
