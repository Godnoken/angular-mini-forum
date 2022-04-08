import { Component, OnInit, Input } from '@angular/core';
import { Thread } from 'src/app/interfaces/thread-interface';
import { User } from 'src/app/interfaces/user-interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-thread-card',
  templateUrl: './thread-card.component.html',
  styleUrls: ['./thread-card.component.scss']
})
export class ThreadCardComponent implements OnInit {
  @Input() thread!: Thread;
  public user!: User;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userService.getUser(this.thread.userId)
      .subscribe(user => this.user = user);
  }
}
