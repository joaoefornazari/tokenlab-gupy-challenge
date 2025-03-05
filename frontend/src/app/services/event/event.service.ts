import { Injectable } from '@angular/core'
import { EventServiceInterface } from './event.interface'
import { CalendarEvent, EventProp } from 'src/types'

@Injectable({
  providedIn: 'root'
})
export class EventService implements EventServiceInterface {
	private id: number = -1
	day: number = 1
	month: number = 0
	year: number = 1970

	start: string = ''
	end: string = ''

	description: string = ''
	content: string = ''

	constructor() {}

	public setEventProps(event: CalendarEvent): void {
		const startDate = new Date(event.start_datetime)
		const endDate = new Date(event.end_datetime)
		
		if (event.id) this.id = event.id

		this.day = startDate.getDate()
		this.month = startDate.getMonth()
		this.year = startDate.getFullYear()

		this.start = startDate.toISOString()
		this.end = endDate.toISOString()

		this.description = event.description
		if (event.content) this.content = event.content
	}

	public setEventProp(propName: EventProp, value: any): void {
		switch (propName) {
			case 'id': {
				this.id = value
				break
			}
			case 'day': {
				this.day = value
				break
			}
			case 'month': {
				this.month = value
				break
			}
			case 'year': {
				this.year = value
				break
			}
			case 'start': {
				this.start = value
				break
			}
			case 'end': {
				this.end = value
				break
			}
			case 'description': {
				this.description = value
				break
			}
			case 'content': {
				this.content = value
				break
			}
		}
	}

	public getEventProp(propName: EventProp): any {
		return this[propName]
	}

	public getEventPayload(): CalendarEvent {
		return {
			id: this.id,
			description: this.description,
			content: this.content,
			start_datetime: this.start,
			end_datetime: this.end,
		}
	}

  public resetEventData(): void {
    this.id = 0,
    this.start = ''
    this.end = ''

    this.day = 1
    this.month = 0
    this.year = 1970

    this.description = ''
    this.content = ''
  }

}
