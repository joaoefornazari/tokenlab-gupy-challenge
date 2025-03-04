import { Component, Input } from '@angular/core';

@Component({
  selector: 'event-delete-confirm',
  imports: [],
	standalone: true,
  templateUrl: './event-delete-confirm.component.html',
  styleUrls: ['./event-delete-confirm.component.css']
})
export class EventDeleteConfirmComponent {

	@Input()
	public eventId!: number

	constructor() {}
}
