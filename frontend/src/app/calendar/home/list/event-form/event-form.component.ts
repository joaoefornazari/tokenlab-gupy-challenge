import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { CalendarEvent } from 'src/types';

@Component({
    selector: 'calendar-event-form',
		standalone: true,
    imports: [NgIf],
    templateUrl: './event-form.component.html',
    styleUrls: ['./event-form.component.css'],
})
export class EventFormComponent {
    public event: CalendarEvent = {
        description: '',
        start_datetime: '',
        end_datetime: '',
        content: ''
    };

		@Input()
		public day!: number
		
		@Input()
		public month!: number

		@Input()
		public year!: number

    private addingEvent: boolean = false;

    constructor() {}

    public isAddingEvent(): boolean {
        return this.addingEvent;
    }

    public startAddingEvent(): void {
        this.addingEvent = true;
    }

    public cancelAddingEvent(): void {
        this.addingEvent = false;
        this.resetForm();
    }

    public onSubmit(): void {
				this.event.start_datetime = this.convertToISOString(this.event.start_datetime)
				this.event.end_datetime = this.convertToISOString(this.event.end_datetime)

				// send to server
        this.addingEvent = false;
        this.resetForm();
    }

		private convertToISOString(time: string): string {
			const date = new Date()

			date.setMonth(this.month)
			date.setDate(this.day)
			date.setFullYear(this.year)
			
			const [hours, minutes] = time.split(':').map(Number)

			date.setHours(hours)
			date.setMinutes(minutes)
			date.setSeconds(0)
			date.setMilliseconds(0)

			return date.toISOString()
		}

    public resetForm(): void {
			this.event = {
					description: '',
					start_datetime: '',
					end_datetime: '',
					content: ''
			};
    }
}
