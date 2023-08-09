import { Component } from '@angular/core';

import { AlertComponent } from './layout/alert/alert.component';

@Component({
  selector: '[app-root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // standalone: true,
  // imports: [AlertComponent, ]
})
export class AppComponent {
  title = 'socialize';
}