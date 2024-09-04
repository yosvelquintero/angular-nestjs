import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Issue } from '@an-challenge/types';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private apiUrl = 'http://localhost:3000/api/issues';

  constructor(private http: HttpClient) {}

  getIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.apiUrl);
  }

  getIssueById(id: string): Observable<Issue> {
    return this.http.get<Issue>(`${this.apiUrl}/${id}`);
  }

  createIssue(issue: Omit<Issue, 'id'>): Observable<Issue> {
    return this.http.post<Issue>(this.apiUrl, issue);
  }

  updateIssue(id: string, issue: Issue): Observable<Issue> {
    return this.http.put<Issue>(`${this.apiUrl}/${id}`, issue);
  }

  deleteIssue(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
