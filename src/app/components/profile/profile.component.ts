import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { User } from 'src/app/interfaces/user-interface';
import { CommentsService } from 'src/app/services/comments.service';
import { UserService } from 'src/app/services/user.service';
import { Comment } from 'src/app/interfaces/comment-interface';
import { UserNameService } from 'src/app/services/validators/user-name.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user!: User;
  public displayItem: string = "info";
  public comments: Comment[] = [];

  constructor(
    public userService: UserService,
    private commentsService: CommentsService,
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
    this.getUser();
  }

  getUser(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
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

  uploadProfilePic(): void {
    const image = this.renderer.selectRootElement(".profile-pic-input", true).value;
    
    this.userService.uploadProfilePic(image)
      .subscribe(user => this.user.profilePic = user.profilePic)
  }

  uploadProfileBanner(): void {
    const image = this.renderer.selectRootElement(".profile-banner-input", true).value;
    
    this.userService.uploadProfileBanner(image)
      .subscribe(user => this.user.profileBanner = user.profileBanner)
  }

  changeUserName(): void {
    if (this.userName.valid) {
      this.userService.changeUserName(this.userName.value)
        .subscribe(user => this.user.userName = user.userName)

      this.userName.reset();
    }
  }
}
