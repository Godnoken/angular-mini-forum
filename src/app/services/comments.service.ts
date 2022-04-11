import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Comment } from '../interfaces/comment-interface';
import { User } from '../interfaces/user-interface';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  public isCreatingComment: boolean = false;
  public isQuoting: boolean = false;
  public comment!: Comment | null;
  public user!: User;
  private apiUrl = "http://localhost:9000";
  
  constructor(
    private http: HttpClient,
    ) { }

  getComments(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/644/comments`)
      .pipe(
        map(comments => comments.filter((comment) => comment.threadId === id))
      )
  }

  getCommentsFromUser(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/644/comments`)
      .pipe(
        map((comments: any) => comments.filter((comments: any) => id === comments.userId)),
        map((comments: any) => comments)
      )
  }

  getComment(id: Number): Observable<Comment> {
    return this.http.get<Comment>(`${this.apiUrl}/comments/${id}`);
  }

  updateComment(id: number, updateThis: Object): Observable<Comment> {
    return this.http.patch<Comment>(`${this.apiUrl}/644/comments/${id}`, updateThis, httpOptions);
  }

  addComment(comment: Comment): Observable<Comment> {
    this.isQuoting = false;
    return this.http.post<Comment>(`${this.apiUrl}/644/comments`, comment, httpOptions);
  }

  passQuoteData(comment: Comment): void {
    // Timeout so quote comment can change if user decides to reply
    // to a different comment
    setTimeout(() => {
      this.isQuoting = true;
    }, 10)
    this.comment = comment;
  }
}