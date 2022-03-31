import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor() { }

  validateLength: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;


    if (!password) {
      return null;
    }

    return password.length >= 8 ? null : { notEnoughCharacters: true }
  }

  validateUpperAndLower: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;

    if (!password) {
      return null;
    }

    return /(?=.*[a-z])(?=.*[A-Z])/.test(password) ? null : { noUpperOrLower: true }
  }

  validateNumber: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;

    if (!password) {
      return null;
    }

    return /[0-9]+/.test(password) ? null : { noNumber: true };
  }

  validateSpecialCharacter: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;

    if (!password) {
      return null;
    }

    return /(?=.*[!?@#%&\$\^\*])/.test(password) ? null : { noSpecialCharacter: true };
  }

  validatePasswordMatch: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get("password");
    const confirmPassword = control.get("confirmPassword");

    return password!.value === confirmPassword!.value ? null : { noMatch: true };
  }
}
