import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public apiURL = "http://localhost:8080/api";
  //public apiURL = "https://dif-mini-forum.herokuapp.com/api";

  public isDoingAction: boolean = false;
  public users: any = {};
  public usersOnline: number = 0;
  public authUsersOnline: any = [];

  constructor() { }
}
