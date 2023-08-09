import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertType } from './alert.enum';
import { AlertInterface } from './alert.interface';
import { AlertService } from './alert.service';

@Component({
  selector: '[app-alert]',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AlertComponent implements OnInit {
	alert?: AlertInterface;
	timerId?: number;
	timeOutMs?: number;

	constructor(private alertService: AlertService) {}

	ngOnInit(): void {
		this.alertService.getAlert().subscribe(alert => {
			this.alert = alert;
		});
		this.hide();
	}

	hide(): void {
		if (this.timerId) {
			window.clearTimeout(this.timerId);
		}
		this.timerId = window.setTimeout(() => this.alert = undefined, this.timeOutMs);
	}
}