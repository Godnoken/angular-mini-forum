import { Component, OnInit, Input, ViewChild, Renderer2 } from '@angular/core';

import { Comment } from 'src/app/interfaces/comment-interface';
import { User } from 'src/app/interfaces/user-interface';
import { CommentsService } from 'src/app/services/comments.service';
import { UserService } from 'src/app/services/user.service';
import { EditCommentComponent } from '../edit-comment/edit-comment.component';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {
  @ViewChild(EditCommentComponent)
  public edit!: EditCommentComponent;
  @Input() comment!: Comment;
  public user!: User;
  public isEditingComment: boolean = false;

  constructor(
    public userService: UserService,
    public commentService: CommentsService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.userService.getUser(this.comment.userId)
      .subscribe(user => this.user = user);
  }

  editComment(): void {
    this.isEditingComment = true;
  }

  replyComment(): void {
    this.commentService.isQuoting = false;
    this.commentService.passQuoteData(this.comment);
    this.commentService.isCreatingComment = true;
    setTimeout(() => {
      window.scrollTo({ top: this.renderer.selectRootElement("app-root", true).scrollHeight, behavior: 'smooth' });
    }, 250)
  }
}
