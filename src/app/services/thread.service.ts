import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Thread } from '../interfaces/thread-interface';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  private apiUrl = "http://localhost:9000";
  public isCreatingThread: boolean = false;

  constructor(
    private http: HttpClient,
  ) { }

  getThreads(): Observable<Thread[]> {
    return this.http.get<Thread[]>(`${this.apiUrl}/664/threads`);
  }

  createThread(thread: Thread): Observable<Thread> {
    return this.http.post<Thread>(`${this.apiUrl}/threads`, thread, httpOptions);
  }
}
