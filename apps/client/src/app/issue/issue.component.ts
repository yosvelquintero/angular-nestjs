import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Issue } from '@sitemate-challenge/types';
import { IssueService } from './issue.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-issue',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './issue.component.html',
  styleUrl: './issue.component.scss',
})
export class IssueComponent implements OnInit {
  issues: Issue[] = [];
  selectedIssue: Issue | null = null;
  newIssue: Omit<Issue, 'id'> = { title: '', description: '' };
  errorMessage = '';

  constructor(private issueService: IssueService) {}

  ngOnInit(): void {
    this.loadIssues();
  }

  loadIssues(): void {
    this.issueService.getIssues().subscribe(
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

    this.issueService.createIssue(this.newIssue).subscribe(
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
    this.issueService.deleteIssue(id).subscribe(
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
