import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Thread } from '../interfaces/thread-interface';
import { SharedService } from './shared.service';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  private apiUrl = this.sharedService.apiURL;
  public isCreatingThread: boolean = false;

  constructor(
    private http: HttpClient,
    private sharedService: SharedService
  ) { }

  getThreads(): Observable<Thread[]> {
    return this.http.get<Thread[]>(`${this.apiUrl}/664/threads`);
  }

  getThread(id: number): Observable<Thread> {
    return this.http.get<Thread>(`${this.apiUrl}/threads/${id}`);
  }

  createThread(thread: Thread): Observable<Thread> {
    return this.http.post<Thread>(`${this.apiUrl}/threads`, thread, httpOptions);
  }

  deleteThread(id: number): Observable<Thread> {
    return this.http.delete<Thread>(`${this.apiUrl}/660/threads/${id}`, httpOptions);
  }

  updateThread(id: number, updateThis: Object): Observable<Thread> {
    return this.http.patch<Thread>(`${this.apiUrl}/644/threads/${id}`, updateThis, httpOptions);
  }
}
