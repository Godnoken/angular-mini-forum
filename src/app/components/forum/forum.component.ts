import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  public isMobile!: boolean;

  constructor(
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
    //this.checkScreenSize();
  }

}
