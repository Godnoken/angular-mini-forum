import { Component, OnInit, Renderer2 } from '@angular/core';
import { debounceTime, map, Observable, fromEvent, startWith} from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isTablet$ = this.sharedService.isTablet$;

  constructor(
    public userService: UserService,
    public sharedService: SharedService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
  }

  showHideBurgerNavigation(): void {
    const burgerNavigation = this.renderer.selectRootElement(".burger-navigation", true);

    burgerNavigation.classList.toggle("active-burger-navigation");
  }
}
