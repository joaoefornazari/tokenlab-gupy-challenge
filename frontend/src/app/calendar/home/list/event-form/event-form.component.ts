import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { CalendarEvent } from 'src/types';

@Component({
    selector: 'calendar-event-form',
		standalone: true,
    templateUrl: './event-form.component.html',
    styleUrls: ['./event-form.component.css'],
    imports: [NgIf]
})
export class EventFormComponent {
    public event: CalendarEvent = {
        description: '',
        start_datetime: '',
        end_datetime: '',
        content: ''
    };

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
        console.log(this.event);
        // Handle form submission, e.g., send the payload to the server
        this.addingEvent = false;
        this.resetForm();
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
