import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { EventService } from 'src/app/services/event/event.service'
import { ApiService } from 'src/app/services/api/api.service'
import { FormsModule } from '@angular/forms'

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
  
  @Input()
  public day!: number

  @Input()
  public month!: number

  @Input()
  public year!: number

	public formData!: {
		start: string
		end: string
		description: string
		content: string
	}

	private api: ApiService

	public mode: 'edit' | 'add'

	@Output()
	public saveEvent = new EventEmitter<void>()

	@Output()
	public cancelEvent = new EventEmitter<void>()

	constructor() {
		this.api = new ApiService()
		this.mode = 'add'
		this.formData = this.resetForm()
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['event']) {
      if (this.event.getEventProp('id') > -1) {
        this.mode = 'edit'
      } else {
        this.mode = 'add'
      }
      this.setFormData(this.event)
		}
	}

	private setFormData(event: EventService) {
    const evt = this.event

		this.formData.start = this.getDatetimeString(evt.getEventProp('start'))
		this.formData.end = this.getDatetimeString(evt.getEventProp('end'))
		this.formData.description = evt.getEventProp('description')
		this.formData.content = evt.getEventProp('content')
	}

	private getDatetimeString(datetime: string): string {
		const date = new Date(datetime)
		const prependZero = (value: number) => {
			return value < 10 ? `0${value}` : value.toString()
		}
		const dateInfo = {
			day: prependZero(date.getDate()),
			month: prependZero(date.getMonth() + 1),
			year: date.getFullYear(),
			hours: prependZero(date.getHours()), 
			minutes: prependZero(date.getMinutes()),
		}

		return `${dateInfo.year}-${dateInfo.month}-${dateInfo.day}T${dateInfo.hours}:${dateInfo.minutes}`
	}

	private sendFormData(): Promise<any> {
    const payload = {
      content: this.formData.content,
      description: this.formData.description,
      start_datetime: new Date(this.formData.start).toISOString(),
      end_datetime: new Date(this.formData.end).toISOString()
    }

    console.log(payload)

    if (this.mode === 'edit') {
			return this.api.put(`/calendar/events/${this.event.getEventProp('id')}`, payload)
		}
		return this.api.post('/calendar/events', payload)
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
    this.cancelEvent.emit()
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
