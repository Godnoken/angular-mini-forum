import { Component, Input, OnInit } from '@angular/core';
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
  public quotedComment!: Comment;
  public quotedUser!: User;

  constructor(
    private commentService: CommentsService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    let idToPass: Number;

    if (this.commentService.isQuoting === true) {
      idToPass = this.comment!.id!;
    } else {
      idToPass = this.comment!.parentId!;
    }
    
      this.commentService.getComment(idToPass)
        .pipe(
          finalize(() => {
            this.userService.getUser(this.quotedComment.userId)
              .subscribe(user => this.quotedUser = user);
          })
        )
        .subscribe(comment => this.quotedComment = comment);
    
  }

}
