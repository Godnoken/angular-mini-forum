import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { finalize } from 'rxjs';

import { CommentsService } from 'src/app/services/comments.service';
import { User } from 'src/app/interfaces/user-interface';
import { Comment } from 'src/app/interfaces/comment-interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-quote-comment',
  templateUrl: './quote-comment.component.html',
  styleUrls: ['./quote-comment.component.scss']
})
export class QuoteCommentComponent implements OnInit {
  @Input() comment!: Comment | null;
  @Output() commentChange = new EventEmitter();
  @Input() isEditingComment!: boolean;
  public isQuoting: boolean = false;
  public quotedUser!: User;
  public quotedComment = {
    userId: 0,
    content: "",
    date: ""
  }

  constructor(
    public commentService: CommentsService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    if (this.commentService.isQuoting === true) {
      this.isQuoting = true;
      this.quotedComment.userId = this.comment!.userId;
      this.quotedComment.content = this.comment!.content;
      this.quotedComment.date = this.comment!.date;
    } else {
      this.quotedComment.userId = this.comment!.quotedUserId!;
      this.quotedComment.content = this.comment!.quotedCommentContent!;
      this.quotedComment.date = this.comment!.quotedCommentDate!;
    }

    this.userService.getUser(this.quotedComment.userId)
      .subscribe(user => this.quotedUser = user);
  }

  removeQuote(): void {
    if (this.commentService.isQuoting === true) {
      this.commentService.isQuoting = false;
    }
    else {
      this.comment!.parentId = null;
      this.commentChange.emit(this.comment);
    }
  }
}
