import { Injectable } from '@angular/core';
import { debounceTime, fromEvent, map, Observable, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public apiURL = "http://localhost:8080/api";
  //public apiURL = "https://dif-mini-forum.herokuapp.com/api";
  
  public isMobile!: boolean;
  public isTablet$!: Observable<any>;
  public isDoingAction: boolean = false;
  public users: any = {};
  public usersOnline: number = 0;
  public authUsersOnline: any = [];

  constructor() { 
    this.subscribeToScreenSize();
  }

  subscribeToScreenSize(): void {
    const checkIsTablet = () => window.innerWidth <= 1024;
    const checkIsMobile = () => window.innerWidth <= 650;
    
    const screenSizeChangedTablet$ = fromEvent(window, 'resize').pipe(debounceTime(500), map(checkIsTablet));
    const screenSizeChangedMobile$ = fromEvent(window, 'resize').pipe(debounceTime(500), map(checkIsMobile));

    this.isTablet$ = screenSizeChangedTablet$.pipe(startWith(checkIsTablet()));

    // Tablet & Mobile are subscribed differently because
    // so far I don't need tablet for components that destroy
    // themselves. The value gets 'lost'(??) when component is
    // destroyed if you use the async pipe
    screenSizeChangedMobile$.pipe(startWith(checkIsMobile()))
      .subscribe((isMobile) => {
        isMobile ? this.isMobile = true : this.isMobile = false;
      })
  }
}
