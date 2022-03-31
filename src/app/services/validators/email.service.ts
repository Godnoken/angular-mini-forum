import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService implements AsyncValidator {
  private usersUrl = "http://localhost:9000/users";

  constructor(
    private http: HttpClient
  ) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.checkEmailAvailability(control.value)
      .pipe(
        map((res: any) => { 
          return res ? null : { emailUsed: true} 
        })
      )
  }

  checkEmailAvailability(email: string): Observable<boolean> {
    return this.http.get(this.usersUrl)
      .pipe(
        map((users: any) => 
          users.filter((user: any) => user.email.toLowerCase() === email.toLowerCase())
        ),
        map((users: any) => !users.length)
      )
  }
}
