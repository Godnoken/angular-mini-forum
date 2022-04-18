import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';

import { Comment } from 'src/app/interfaces/comment-interface';
import { Thread } from 'src/app/interfaces/thread-interface';
import { CommentsService } from 'src/app/services/comments.service';
import { ThreadService } from 'src/app/services/thread.service';

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


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public commentService: CommentsService,
    private threadService: ThreadService,
  ) { }

  ngOnInit(): void {
    this.threadId = Number(this.route.snapshot.paramMap.get("id"));
    this.currentPage = Number(this.route.snapshot.paramMap.get("page"));
    this.getComments();
    this.getThread();
  }

  getComments(): void {
    this.commentService.getComments(this.threadId)
      .pipe(
        finalize(() => {
          // Display the current page's comments
          this.displayPageComments(this.comments, this.rows, this.currentPage);
          // Read how many pages are needed
          this.pageCount = Math.ceil(this.comments.length / this.rows);
          this.setupPagination();
        })
      )
      .subscribe(comments => {
        this.comments = comments;
      })
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
      this.router.navigateByUrl(`/thread/${this.threadId}/${this.currentPage}`);
    }
    // If user is not viewing & deleting comment on the last page
    // Update pageButtons if there are no more comments on the last page
    else if (this.rows * this.currentPage === this.comments.length) {
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