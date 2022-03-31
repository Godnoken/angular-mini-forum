import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import { NewUser } from '../interfaces/newUser-interface';

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

  constructor(
    private http: HttpClient,
  ) { }

  registerUser(newUser: NewUser): Observable<NewUser> {
    return this.http.post<NewUser>(this.usersUrl, newUser, httpOptions);
  }

  getUsers(name: string) {
    return this.http.get<NewUser[]>(this.usersUrl).pipe(
      map((response: any) => {
        return response.filter((res: any) => res.userName === name)
      })
    );
    }
}
