import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import { User } from '../interfaces/user-interface';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = "http://localhost:9000/users";
  private authUrl = "http://localhost:9000";
  public jwtToken: string = "none";
  public loggedUserId: number = 0;
  public user!: User;
  private password: string = "";

  constructor(
    private http: HttpClient,
  ) { }

  registerUser(user: User): Observable<any> {
    user.isOnline = true;
    user.title = "Supporter";
    user.profilePic = "";
    user.profileBanner = "";
    this.password = user.password;
    return this.http.post<any>(`${this.authUrl}/register`, user, httpOptions);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/${id}`);
  }

  loginUser(user: User): Observable<any> {
    user.isOnline = true;
    this.password = user.password;
    return this.http.post<any>(`${this.authUrl}/login`, user, httpOptions)
  }

  updateUser(): Observable<User> {
    return this.http.patch<User>(`${this.usersUrl}/${this.loggedUserId}`, httpOptions);
  }
  
  uploadProfilePic(image: string): Observable<User> {
    this.user.profilePic = image;
    this.user.password = this.password;
    return this.http.put<User>(`${this.usersUrl}/${this.loggedUserId}`, this.user, httpOptions);
  }

  uploadProfileBanner(image: string): Observable<User> {
    this.user.profileBanner = image;
    this.user.password = this.password;
    return this.http.put<User>(`${this.usersUrl}/${this.loggedUserId}`, this.user, httpOptions);
  }
}
