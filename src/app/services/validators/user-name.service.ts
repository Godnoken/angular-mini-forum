import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class UserNameService implements AsyncValidator {
  private apiUrl = this.sharedService.apiURL;

  constructor(
    private http: HttpClient,
    private sharedService: SharedService
  ) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.checkUserNameAvailability(control.value)
      .pipe(
        map((res: any) => { 
          return res ? null : { userNameTaken: true} 
        })
      )
  }

  checkUserNameAvailability(username: string): Observable<boolean> {
    return this.http.get(`${this.apiUrl}/users`)
      .pipe(
        map((users: any) => 
          users.filter((user: any) => user.userName.toLowerCase() === username.toLowerCase())
        ),
        map((users: any) => !users.length)
      )
  }
}
