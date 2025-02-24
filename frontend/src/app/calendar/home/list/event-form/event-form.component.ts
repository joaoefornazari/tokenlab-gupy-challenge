import { Component, Input } from '@angular/core'
import { NgIf } from '@angular/common'
import { CalendarEvent } from 'src/types'
import { ApiService } from 'src/app/services/api.service'
import { Output, EventEmitter } from '@angular/core'
import { FormsModule } from '@angular/forms'

@Component({
    selector: 'calendar-event-form',
		standalone: true,
    imports: [NgIf, FormsModule],
    templateUrl: './event-form.component.html',
    styleUrls: ['./event-form.component.css'],
})
export class EventFormComponent {
    public event: CalendarEvent = {
        description: '',
        start_datetime: '',
        end_datetime: '',
        content: ''
    }

		@Input()
		public day!: any
		
		@Input()
		public month!: number

		@Input()
		public year!: number

    private addingEvent: boolean = false
		private api: ApiService

    constructor() {
			this.api = new ApiService()
		}

    public isAddingEvent(): boolean {
        return this.addingEvent
    }

    public startAddingEvent(): void {
        this.addingEvent = true
    }

    public cancelAddingEvent(): void {
        this.addingEvent = false
        this.resetForm()
    }

		@Output()
		public eventCreated = new EventEmitter<void>()

		private convertToISOString(time: string): string {
			const date = new Date()
			date.setMonth(this.month)
			date.setDate(this.day.day)
			const [hours, minutes] = time.split(':').map(Number)
			date.setHours(hours)
			date.setMinutes(minutes)
			date.setSeconds(0)
			date.setMilliseconds(0)
			return date.toISOString()
		}

		public onSubmit(): void {
			this.event.start_datetime = this.convertToISOString(this.event.start_datetime);
			this.event.end_datetime = this.convertToISOString(this.event.end_datetime);

			this.api.post('/calendar/events', this.event)
				.then((res) => {
					this.eventCreated.emit()
				})
				.catch((error) => {
					alert('Error while creating event')
					console.error(error)
				})
				.finally(() => {
					this.addingEvent = false
					this.resetForm()
				})
		}

    public resetForm(): void {
			this.event = {
					description: '',
					start_datetime: '',
					end_datetime: '',
					content: ''
			}
    }
}
