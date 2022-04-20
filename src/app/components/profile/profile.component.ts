import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { User } from 'src/app/interfaces/user-interface';
import { CommentsService } from 'src/app/services/comments.service';
import { UserService } from 'src/app/services/user.service';
import { Comment } from 'src/app/interfaces/comment-interface';
import { UserNameService } from 'src/app/services/validators/user-name.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user!: User;
  public displayItem: string = "info";
  public comments: Comment[] = [];
  public isBrowsingProfile: boolean = true;
  private userId = Number(this.route.snapshot.paramMap.get("id"));
  private routerEvents = this.router.events
    .subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.userId = Number(this.route.snapshot.paramMap.get("id"));

        if (!this.sharedService.users[this.userId]) {
          this.getUser();
        }
        else {
          this.user = this.sharedService.users[this.userId];
        }
        
        this.showInfo();
      }
    })

  constructor(
    public userService: UserService,
    private commentsService: CommentsService,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private userNameValidator: UserNameService
  ) { }

  userName = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(3)],

    asyncValidators:
      [this.userNameValidator.validate.bind(this.userNameValidator)],
    updateOn: "blur"
  })

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.routerEvents.unsubscribe();
  }

  getUser(): void {
    this.userService.getUser(this.userId)
      .subscribe(user => { this.sharedService.users[user.id!] = user, this.user = user });
  }

  showInfo(): void {
    this.displayItem = "info";
  }

  showComments(): void {
    this.displayItem = "comments";
    this.getComments();
  }

  showSettings(): void {
    this.displayItem = "settings";
  }

  getComments(): void {
    this.commentsService.getCommentsFromUser(this.user.id!)
      .subscribe(comments => this.comments = comments);
  }

  updateUser(): void {
    const keysToUpdate: any = {};
    let profilePic = this.renderer.selectRootElement(".profile-pic-input", true);
    let profileBanner = this.renderer.selectRootElement(".profile-banner-input", true);

    if (profilePic.value !== this.user.profilePic && profilePic.value.length !== 0) keysToUpdate.profilePic = profilePic.value;
    if (profileBanner.value !== this.user.profileBanner && profileBanner.value.length !== 0) keysToUpdate.profileBanner = profileBanner.value;
    if (this.userName.valid && this.userName.value.length !== 0) keysToUpdate.userName = this.userName.value;

    if (Object.keys(keysToUpdate).length !== 0) {
      this.userService.updateUser(keysToUpdate)
        .subscribe(user => {
          this.user = user
          this.userService.user = user;
        });
    }

    profilePic.value = "";
    profileBanner.value = "";
    this.userName.reset();
  }
}
