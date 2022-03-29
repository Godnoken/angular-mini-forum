import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Comment } from '../interfaces/comment-interface';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private commentsUrl = "http://localhost:9000/comments";

  constructor(
    private http: HttpClient,
  ) { }

  getCommentsFromDb(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentsUrl);
  }

  updateComment(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this.commentsUrl}/${comment.id}`, comment, httpOptions);
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.commentsUrl, comment, httpOptions);
  }
}