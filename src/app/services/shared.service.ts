import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  //public apiURL = "http://localhost:8080";
  public apiURL = "https://dif-mini-forum.herokuapp.com/api";

  constructor() { }
}
