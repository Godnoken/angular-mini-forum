import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user-interface';
import { CommentsService } from 'src/app/services/comments.service';
import { UserService } from 'src/app/services/user.service';
import { Comment } from 'src/app/interfaces/comment-interface';

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
    private route: ActivatedRoute
  ) { }

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

  getComments(): void {
    this.commentsService.getCommentsFromUser(this.user.id!)
      .subscribe(comments => this.comments = comments);
  }
}
