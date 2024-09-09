import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Issue } from '@an/types';

@Injectable()
export class AppService {
  // Dummy data
  private issues: Issue[] = [
    {
      id: 'd4e4a3f5-2b97-4fcb-bb39-1c23e85e0a14',
      title: 'Bug in login functionality',
      description: 'Users are unable to log in with their credentials.',
    },
    {
      id: 'b9a2f9c2-ff0e-4575-9f5b-7d9fe6d3f0e7',
      title: 'Add dark mode feature',
      description: 'Implement a dark mode toggle in the settings.',
    },
    {
      id: 'c8d15ad7-5d28-4b9b-bb69-8a9c3c39d49a',
      title: 'Database optimization needed',
      description: 'Queries are taking too long to execute.',
    },
    {
      id: 'e3f97d90-14fc-47ea-b9e1-2c4586764bf8',
      title: 'Update privacy policy page',
      description: 'Revise content to comply with new regulations.',
    },
    {
      id: 'a0b5d1fe-2e42-43f1-bd64-cde82a6fbe17',
      title: 'Refactor user profile component',
      description: 'Improve code readability and maintainability.',
    },
  ];

  getData(): Issue[] {
    return this.issues;
  }

  createIssue(issue: Issue): Issue {
    const newIssue = {
      id: uuidv4(),
      ...issue,
    };

    this.issues = [newIssue, ...this.issues];
    return issue;
  }

  updateIssue(id: string, updates: Partial<Issue>): Issue | null {
    const issueIndex = this.issues.findIndex((issue) => issue.id === id);

    if (issueIndex === -1) {
      return null; // Issue not found
    }

    this.issues[issueIndex] = {
      ...this.issues[issueIndex],
      ...updates,
    };

    return this.issues[issueIndex];
  }

  deleteIssue(id: string): Issue | null {
    const issueIndex = this.issues.findIndex((issue) => issue.id === id);

    if (issueIndex === -1) {
      return null; // Issue not found
    }

    const deletedIssue = this.issues[issueIndex];
    this.issues = this.issues.filter((issue) => issue.id !== id);

    return deletedIssue;
  }
}
