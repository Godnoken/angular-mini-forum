import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../interfaces/user-interface';
import { SharedService } from './shared.service';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = this.sharedService.apiURL;
  public jwtToken: string = "none";
  public loggedUserId: number = 0;
  public user!: User;

  constructor(
    private http: HttpClient,
    private sharedService: SharedService
  ) { }

  registerUser(user: User): Observable<any> {
    user.isOnline = true;
    user.title = "Supporter";
    user.profilePic = "";
    user.profileBanner = "";
    return this.http.post<any>(`${this.apiUrl}/register`, user, httpOptions);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  loginUser(user: User): Observable<any> {
    user.isOnline = true;
    return this.http.post<any>(`${this.apiUrl}/login`, user, httpOptions);
  }

  updateUser(updateThis: Object): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/644/users/${this.loggedUserId}`, updateThis, httpOptions);
  }
}
