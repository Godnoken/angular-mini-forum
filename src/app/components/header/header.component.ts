import { Component, OnInit, Renderer2 } from '@angular/core';
import { debounceTime, map, Observable, fromEvent, startWith} from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isMobile$!: Observable<any>;

  constructor(
    public userService: UserService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.subscribeToScreenSize();
  }

  subscribeToScreenSize(): void {
    const checkScreenSize = () => document.body.offsetWidth <= 1024;
    
    const screenSizeChanged$ = fromEvent(window, 'resize').pipe(debounceTime(500), map(checkScreenSize));
    
    this.isMobile$ = screenSizeChanged$.pipe(startWith(checkScreenSize()));
  }

  showHideBurgerNavigation(): void {
    const burgerNavigation = this.renderer.selectRootElement(".burger-navigation", true);

    burgerNavigation.classList.toggle("active-burger-navigation");
  }
}
