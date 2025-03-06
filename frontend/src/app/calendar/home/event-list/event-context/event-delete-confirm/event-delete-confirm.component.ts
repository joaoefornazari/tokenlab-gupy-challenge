import { Component, Input } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'event-delete-confirm',
  imports: [],
	standalone: true,
  templateUrl: './event-delete-confirm.component.html',
  styleUrls: ['./event-delete-confirm.component.css']
})
export class EventDeleteConfirmComponent {
	private api: ApiService

	@Input()
	public eventId!: number

	@Output()
	public deletedEvent: EventEmitter<void> = new EventEmitter();

	@Output()
	public cancelDelete: EventEmitter<void> = new EventEmitter();

	constructor() {
		this.api = new ApiService()
	}

	public onCancel() {
		this.cancelDelete.emit()
	}

	public async onDelete() {
		try {
			const cookie = document.cookie.match(/token=([^;]*)/)
			const token = cookie ? cookie[1] : ''

			const result = await this.api.delete(`/calendar/events/${this.eventId}?token=${token}`)
			if (result.status === 'rejected') {
				throw new Error(result.reason.response.data.error)
			}

			this.deletedEvent.emit()
		} catch (error: any) {
			alert(error)
		}
	}
}
