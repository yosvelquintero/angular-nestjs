import { Component } from '@angular/core';
import { IssueComponent } from './issue/issue.component';

@Component({
  standalone: true,
  imports: [IssueComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  appName = 'Nx Angular NestJS';
}
