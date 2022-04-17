import { Component, OnInit, Input, Renderer2, Output, EventEmitter } from '@angular/core';

import { Comment } from 'src/app/interfaces/comment-interface';
import { User } from 'src/app/interfaces/user-interface';
import { CommentsService } from 'src/app/services/comments.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.scss']
})
export class EditCommentComponent implements OnInit {
  @Input() comment!: Comment;
  @Output() commentChange = new EventEmitter();
  @Input() isEditingComment!: boolean;
  @Output() isEditingCommentChange = new EventEmitter();
  @Input() user!: User;
  private content!: HTMLElement;
  private currentParentId!: number | null;

  constructor(
    private renderer: Renderer2,
    private commentService: CommentsService,
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.currentParentId = this.comment.parentId;
    this.content = this.renderer.selectRootElement(".edit-comment-content", true);
    this.setEndOfContenteditable(this.content);
  }

  onSave(): void {
    let keysToUpdate: any = {};
    
    if (this.comment.content !== this.content.innerText) {
      keysToUpdate.content = this.content.innerText;
    }

    if (this.comment.parentId !== this.currentParentId) {
      keysToUpdate.parentId = null;
    }

    if (Object.keys(keysToUpdate).length !== 0) {
      this.commentService.updateComment(this.comment.id!, keysToUpdate)
        .subscribe(comment => {
          this.comment = comment;
          this.commentChange.emit(this.comment);
          this.onExit();
        });
    }
    else {
      this.onExit();
    }
  }

  onCancel(): void {
    if (this.comment.parentId === null) this.comment.parentId = this.currentParentId;
    this.onExit();
  }

  onExit(): void {
    this.isEditingComment = false;
    this.isEditingCommentChange.emit(this.isEditingComment);
    this.sharedService.isDoingAction = false;
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
