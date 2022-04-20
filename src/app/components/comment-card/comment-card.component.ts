import { Component, OnInit, Input, ViewChild, Renderer2, Output, EventEmitter, SimpleChanges } from '@angular/core';

import { Comment } from 'src/app/interfaces/comment-interface';
import { User } from 'src/app/interfaces/user-interface';
import { Thread } from 'src/app/interfaces/thread-interface';
import { CommentsService } from 'src/app/services/comments.service';
import { UserService } from 'src/app/services/user.service';
import { EditCommentComponent } from '../edit-comment/edit-comment.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {
  @ViewChild(EditCommentComponent)
  public edit!: EditCommentComponent;
  @Input() comment!: Comment;
  @Output() emitDeleteComment = new EventEmitter();
  @Input() isBrowsingProfile = false;
  @Input() thread!: Thread;
  @Input() user!: User;
  public isEditingComment: boolean = false;

  constructor(
    public userService: UserService,
    public commentService: CommentsService,
    public sharedService: SharedService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && changes['user'].currentValue === undefined && changes['user'].firstChange === false) {
      this.getUser();
    }
  }

  getUser(): void {
    this.userService.getUser(this.comment.userId)
      .subscribe(user => {this.sharedService.users[user.id!] = user, this.user = user});
  }

  editComment(): void {
    this.isEditingComment = true;
    this.sharedService.isDoingAction = true;
  }

  replyComment(): void {
    this.commentService.isQuoting = false;
    this.sharedService.isDoingAction = true;
    this.commentService.passQuoteData(this.comment);
    this.commentService.isCreatingComment = true;
    setTimeout(() => {
      window.scrollTo({ top: this.renderer.selectRootElement("app-root", true).scrollHeight, behavior: 'smooth' });
    }, 100)
  }

  deleteComment(): void {
    this.commentService.deleteComment(this.comment.id!)
      .subscribe(() => this.emitDeleteComment.emit(this.comment));
  }
}
