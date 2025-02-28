import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { EventService } from 'src/app/services/event.service'
import { ApiService } from 'src/app/services/api.service'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'event-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
})
export class EventFormComponent implements OnChanges {
	@Input()
	public event!: EventService

	public formData: {
		start: string
		end: string
		description: string
		content: string
	}

	private api: ApiService

	public mode: 'edit' | 'add'

	@Output()
	public saveEvent = new EventEmitter<void>()

	constructor() {
		this.api = new ApiService()
		this.mode = 'add'
		this.formData = this.resetForm()
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['event']) {
			if (this.event.getEventProp('id') !== 0) {
				this.setFormData(this.event)
				this.mode = 'edit'
			} else {
				this.mode = 'add'
			}
		}
	}

	private setFormData(event: EventService) {
		this.formData.start = this.event.getEventProp('start')
		this.formData.end = this.event.getEventProp('end')
		this.formData.description = this.event.getEventProp('description')
		this.formData.content = this.event.getEventProp('content')
	}

	private sendFormData(): Promise<any> {
		if (this.mode === 'edit') {
			return this.api.put(`/calendar/events/${this.event.getEventProp('id')}`, this.formData)
		}
		return this.api.post('/calendar/events', this.formData)
	}

	public onSubmit() {
		return this.sendFormData()
			.then((response: any) => {
				this.formData = this.resetForm()
				this.saveEvent.emit()
			})
			.catch((error: any) => {
				alert(error?.message ?? 'Erro ao registrar dados do evento')
			})
	}

	public cancelAddingEvent() {
		this.formData = this.resetForm()
	}

	private resetForm() {
		return {
			start: '',
			end: '',
			description: '',
			content: ''
		}
	}
}
