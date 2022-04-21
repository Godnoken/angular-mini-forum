import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from 'src/app/interfaces/user-interface';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-users-online',
  templateUrl: './users-online.component.html',
  styleUrls: ['./users-online.component.scss']
})
export class UsersOnlineComponent implements OnInit {
  public userCount = this.sharedService.usersOnline;
  public users: string[] = this.sharedService.authUsersOnline;

  constructor(
    private socket: Socket,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.socket.on('authUsersOnline', (users: any) => {
      this.users = users;
      this.sharedService.authUsersOnline = users;
    })

    this.socket.on('userCount', (userCount: number) => {
      this.userCount = userCount;
      this.sharedService.usersOnline = userCount;
    })
  }

}
