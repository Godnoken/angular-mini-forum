import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';

import { Comment } from 'src/app/interfaces/comment-interface';
import { User } from 'src/app/interfaces/user-interface';
import { CommentsService } from 'src/app/services/comments.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments: Comment[] = [];
  users: User[] = [];
  public isCreatingComment?: boolean = false;
  private ids: any = [];

  constructor(
    private commentService: CommentsService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.getComments();
  }

  getComments(): void {
    this.commentService.getCommentsFromDb()
      .pipe(
        finalize(() => {
          this.getUsers();
        })
      )
      .subscribe(comments => {
        this.comments = comments
        for (let i = 0; i < comments.length; i++) {
          if (this.ids.indexOf(comments[i].userId) === -1) {
            this.ids.push(comments[i].userId);
          }
        }
      })
  }

  getUsers(): void {
    for (let i = 0; i < this.ids.length; i++) {
      this.userService.getUser(this.comments[i].userId)
        .subscribe(user => {
          this.users.push(user);
        })
    }
  }

  editComment(comment: Comment): void {
    comment.isEditing = true;
    if (comment) {
      this.commentService.updateComment(comment)
        .subscribe();
    }
  }

  displayCreateComment(): void {
    this.isCreatingComment = true;
  }

  deleteCreateComment(): void {
    this.isCreatingComment = false;
  }

  addComment(comment: Comment): void {
    if (comment) {
      this.commentService.addComment(comment)
        .subscribe(comment => this.comments.push(comment));
      this.isCreatingComment = false;
    }
  }


}
