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
  private apiUrl = "http://localhost:9000";
  
  constructor(
    private http: HttpClient,
    ) { }

  getCommentsFromDb(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/664/comments`);
  }

  updateComment(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this.apiUrl}/640/comments/${comment.id}`, comment, httpOptions);
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/664/comments`, comment, httpOptions);
  }
}