import { Component, OnInit, Input, Output, EventEmitter, Renderer2 } from '@angular/core';

import { Thread } from 'src/app/interfaces/thread-interface';
import { User } from 'src/app/interfaces/user-interface';
import { ThreadService } from 'src/app/services/thread.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-thread-card',
  templateUrl: './thread-card.component.html',
  styleUrls: ['./thread-card.component.scss']
})
export class ThreadCardComponent implements OnInit {
  @Input() thread!: Thread;
  @Output() emitDeleteThread = new EventEmitter();
  public user!: User;
  public isEditingThread: boolean = false;
  private titleInput!: HTMLInputElement;

  // Workaround so the entire card can stay as a link apart from
  // the buttons
  public clickedButton: boolean = false;

  // The conditional routerlink in the template wouldn't decode
  // the {{ }} for some odd reason, so using the url variable
  // was the solution
  public url: any;

  constructor(
    public userService: UserService,
    private threadService: ThreadService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.url = `/thread/${this.thread.id!}`
    this.getUser();
  }

  getUser(): void {
    this.userService.getUser(this.thread.userId)
      .subscribe(user => this.user = user);
  }

  editThread(): void {
    this.clickedButton = true;
    this.isEditingThread = true;

    setTimeout(() => {
      this.titleInput = this.renderer.selectRootElement(".title-input", true);
      this.titleInput.focus();
    }, 25);
  }

  onSave(): void {
    this.clickedButton = true;
    let keysToUpdate: any = {};

    if (this.thread.title !== this.titleInput.value) keysToUpdate.title = this.titleInput.value;

    if (Object.keys(keysToUpdate).length !== 0) {
      this.threadService.updateThread(this.thread.id!, keysToUpdate)
        .subscribe(thread => {
          this.thread = thread;
          this.onExit();
        });
    }
    else {
      this.onExit();
    }
  }

  onExit(): void {
    this.clickedButton = true;
    this.isEditingThread = false;
  }

  deleteThread(): void {
    this.clickedButton = true;
    this.threadService.deleteThread(this.thread.id!)
      .subscribe(() => this.emitDeleteThread.emit(this.thread));
  }
}
