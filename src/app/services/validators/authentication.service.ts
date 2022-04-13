import { Injectable } from '@angular/core';
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { SharedService } from '../shared.service';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = this.sharedService.apiURL;

  constructor(
    private http: HttpClient,
    private sharedService: SharedService
  ) { }

  validateLogin: AsyncValidatorFn = (control: AbstractControl): Observable<ValidationErrors | null> => {
    const email = control.get("email")!.value;
    const password = control.get("password")!.value;
    const user = { "email": email, "password": password };

    return this.http.post<any>(`${this.apiUrl}/login`, user, httpOptions)
    .pipe(
      map((res: any) => {
          return res.accessToken !== undefined ? null : { loginInvalid: true }
        }),
        catchError((error) => {
          if (error.error === "Cannot find user") {
            return of({ incorrectEmail: true })
          }
          else if (error.error === "Incorrect password" || error.error === "Password is too short") {
            return of({ incorrectPassword: true})
          }
          else {
            return of(error)
          }
        })
      )
  }
}
