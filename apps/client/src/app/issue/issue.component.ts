import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Issue } from '@sitemate-challenge/types';
import { IssueService } from './issue.service';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-issue',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './issue.component.html',
  styleUrl: './issue.component.scss',
})
export class IssueComponent implements OnInit, OnDestroy {
  issues: Issue[] = [];
  selectedIssue: Issue | null = null;
  newIssue: Omit<Issue, 'id'> = { title: '', description: '' };
  errorMessage = '';

  private unsubscribe$ = new Subject<void>();

  constructor(private issueService: IssueService) {}

  ngOnInit(): void {
    this.loadIssues();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadIssues(): void {
    this.issueService
      .getIssues()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data) => {
          this.issues = data;
        },
        (error) => {
          this.errorMessage = 'Failed to load issues';
          console.error('Error fetching issues:', error);
        }
      );
  }

  createIssue(): void {
    if (!this.newIssue.title || !this.newIssue.description) {
      this.errorMessage = 'Title and description are required';
      return;
    }

    this.issueService
      .createIssue(this.newIssue)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        () => {
          this.newIssue = { title: '', description: '' };
          this.errorMessage = '';
          this.loadIssues(); // Refresh the list after creation
        },
        (error) => {
          this.errorMessage = 'Failed to create issue';
          console.error('Error creating issue:', error);
        }
      );
  }

  selectIssue(issue: Issue): void {
    this.selectedIssue = { ...issue };
  }

  updateIssue(): void {
    if (!this.selectedIssue) {
      this.errorMessage = 'No issue selected for update';
      return;
    }

    this.issueService
      .updateIssue(this.selectedIssue.id, this.selectedIssue)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        () => {
          this.selectedIssue = null;
          this.errorMessage = '';
          this.loadIssues(); // Refresh the list after update
        },
        (error) => {
          this.errorMessage = 'Failed to update issue';
          console.error('Error updating issue:', error);
        }
      );
  }

  deleteIssue(id: string): void {
    this.issueService
      .deleteIssue(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        () => {
          this.errorMessage = '';
          this.loadIssues(); // Refresh the list after deletion
        },
        (error) => {
          this.errorMessage = 'Failed to delete issue';
          console.error('Error deleting issue:', error);
        }
      );
  }

  cancel(): void {
    this.selectedIssue = null;
    this.newIssue = { title: '', description: '' };
    this.errorMessage = '';
  }
}
