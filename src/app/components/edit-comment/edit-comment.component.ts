import { Component, OnInit, Input, Renderer2, HostListener } from '@angular/core';

import { Comment } from 'src/app/interfaces/comment-interface';
import { User } from 'src/app/interfaces/user-interface';
import { CommentsService } from 'src/app/services/comments.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.scss']
})
export class EditCommentComponent implements OnInit {
  @Input() comment!: Comment;
  public user!: User;

  constructor(
    private renderer: Renderer2,
    private commentService: CommentsService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUser(this.comment.userId)
      .subscribe(user => this.user = user)
    const content = this.renderer.selectRootElement(".edit-comment-content", true);
    this.setEndOfContenteditable(content);
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    this.onExit();
  }

  onSave(): void {
    const content = this.renderer.selectRootElement(".edit-comment-content", true);
    this.comment.content = content.outerText;

    this.onExit();
  }

  onExit(): void {
    this.comment.isEditing = false;
    if (this.comment) {
      this.commentService.updateComment(this.comment)
        .subscribe();
    }
  }

  setEndOfContenteditable(contentEditableElement: Element) {
    let range, selection;

    if (document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
      range = document.createRange();//Create a range (a range is a like the selection but invisible)
      range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
      range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
      selection = window.getSelection();//get the selection object (allows you to change selection)
      selection!.removeAllRanges();//remove any selections already made
      selection!.addRange(range);//make the range you have just created the visible selection
    }
  }
}
