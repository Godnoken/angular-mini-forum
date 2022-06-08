import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { concatMap, finalize, forkJoin, from } from 'rxjs';

import { Comment } from 'src/app/interfaces/comment-interface';
import { Thread } from 'src/app/interfaces/thread-interface';
import { CommentsService } from 'src/app/services/comments.service';
import { SharedService } from 'src/app/services/shared.service';
import { ThreadService } from 'src/app/services/thread.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {
  public comments!: Comment[];
  public threadId!: number;
  public thread!: Thread;
  public paginatedComments!: Comment[];
  public rows: number = 5;
  public currentPage: number = 1;
  public pageCount!: number;
  public pageButtons: number[] = [];
  public newComments: Comment[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public commentService: CommentsService,
    private threadService: ThreadService,
    private userService: UserService,
    public sharedService: SharedService,
    private socket: Socket
  ) { }

  ngOnInit(): void {
    this.threadId = Number(this.route.snapshot.paramMap.get("id"));
    this.currentPage = Number(this.route.snapshot.paramMap.get("page"));
    this.getComments();
    this.getThread();
    this.enterRoomOnSocket();
    this.listenToNewComments();
  }

  enterRoomOnSocket(): void {
    this.socket.emit('enterThread', this.threadId);
  }

  listenToNewComments(): void {
    this.socket.on('receiveNewComment', (comment: Comment) => {
      this.newComments.push(comment);
    })
  }

  displayNewComments(calledFromAddComment: boolean): void {
    const amountOfPagesNewCommentsIncluded = Math.ceil((this.comments.length + this.newComments.length) / this.rows);
    const amountOfPagesNewCommentsExcluded = this.pageCount;
    this.comments.push(...this.newComments);

    // If new comments exceed current page's limit
    if (amountOfPagesNewCommentsIncluded > this.pageCount) {
      this.pageCount = amountOfPagesNewCommentsIncluded;

      const commentsToPushCurrentPage = this.newComments.splice(0, this.rows - this.paginatedComments.length);

      // If user added a new comment, create new page/s
      // and navigate to the last one
      if (calledFromAddComment === true) {
        this.currentPage = this.pageCount;
        this.displayPageComments(this.comments, this.rows, this.currentPage);
        this.router.navigateByUrl(`forum/thread/${this.threadId}/${this.pageCount}`);
      }
      else {
        // If user did not add a comment &&
        // is reading in new comments from other users &&
        // last page is full, create & navigate to the next page
        if (this.paginatedComments.length >= 5) {
          this.currentPage = amountOfPagesNewCommentsExcluded + 1;
          this.displayPageComments(this.comments, this.rows, this.currentPage);
          this.router.navigateByUrl(`forum/thread/${this.threadId}/${this.currentPage}`);
        }
        // Otherwise push comments to current page & stay on it
        else {
          this.paginatedComments.push(...commentsToPushCurrentPage);
        }
      }

      // Display new pages in navigation
      this.setupPagination();
    }
    else {
      // If user added a comment & is not on the last page
      // navigate to last page
      if (this.currentPage !== this.pageCount) {
        this.currentPage = this.pageCount;
        this.displayPageComments(this.comments, this.rows, this.currentPage);
        this.router.navigateByUrl(`forum/thread/${this.threadId}/${this.pageCount}`);
      }
      // if user did not add a comment &
      // is only reading in new comments
      // push in new comments to currentPage
      else {
        this.paginatedComments.push(...this.newComments);
      }
    }

    this.newComments = [];
  }

  getComments(): void {
    this.commentService.getComments(this.threadId)
      .pipe(
        finalize(() => {
          this.getUsers();
          // Display the current page's comments
          this.displayPageComments(this.comments, this.rows, this.currentPage);
          // Read how many pages are needed
          this.pageCount = Math.ceil(this.comments.length / this.rows);
          this.setupPagination();
        })
      )
      .subscribe(comments => {
        this.comments = comments.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      })
  }

  getUsers(): void {
    let usersComment = this.reduceUsersToFetch();

    from([usersComment])
      .pipe(
        concatMap(userComment => forkJoin(userComment.map((userComment: any) => this.userService.getUser(userComment.userId)))
        )
      )
      .subscribe((users: any) => users.forEach((user: any) => this.sharedService.users[user.id] = user));
  }

  reduceUsersToFetch() {
    const flag: any = {};
    const usersComment: any = [];

    this.comments.forEach((user: any) => {
      if (!flag[user.userId] && !this.sharedService.users[user.userId]) {
        flag[user.userId] = true;
        usersComment.push(user);
      }
    })

    return usersComment;
  }

  getThread(): void {
    this.threadService.getThread(this.threadId)
      .subscribe(thread => this.thread = thread);
  }

  deleteComment(commentToDelete: Comment): void {
    // Delete comment from comments array
    this.comments = this.comments.filter(comment => comment.id !== commentToDelete.id);
    // Delete from displayed comments
    this.paginatedComments = this.paginatedComments.filter(comment => comment.id !== commentToDelete.id);

    // If there are no more comments on page, go to previous page
    if (this.paginatedComments.length === 0) {
      this.pageCount--;
      this.currentPage--;
      this.setupPagination();
      this.router.navigateByUrl(`forum/thread/${this.threadId}/${this.currentPage}`);
    }
    // If user is not viewing & deleting comment on the last page
    // Update pageButtons if there are no more comments on the last page
    else if (this.rows * (this.pageCount - 1) === this.comments.length) {
      this.pageCount--;
      this.setupPagination();
    }

    // Update displayed comments each time user deletes a comment
    this.displayPageComments(this.comments, this.rows, this.currentPage);
  }

  displayPageComments(items: any, rowsPerPage: any, page: any) {
    // Read from 0 (array)
    page--;

    // Slice 5 items from comments array & display them through paginatedComments
    let start = rowsPerPage * page;
    let end = start + rowsPerPage;
    this.paginatedComments = items.slice(start, end);
  }

  // Create pagebuttons
  setupPagination() {
    // Reset display
    this.pageButtons = [];

    // Set amount of pageButtons to display
    for (let i = 1; i < this.pageCount + 1; i++) {
      this.pageButtons.push(i);
    }
  }
}