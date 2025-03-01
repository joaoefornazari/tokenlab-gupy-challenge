import { Injectable } from '@angular/core'
import { EventServiceInterface } from './event.interface'
import { CalendarEvent, EventProp } from 'src/types'

@Injectable({
  providedIn: 'root'
})
export class EventService implements EventServiceInterface {
	private id: number = 0
	day: number = 1
	month: number = 0
	year: number = 1970

	start: string = ''
	end: string = ''

	description: string = ''
	content: string = ''

	constructor() {}

	public setEventProps(event: CalendarEvent): void {
		const date = new Date(event.start_datetime)
		
		if (event.id) this.id = event.id

		this.day = date.getDate()
		this.month = date.getMonth()
		this.year = date.getFullYear()

		this.start = this.getTimeString(date)
		this.end = this.getTimeString(new Date(event.end_datetime))

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
			start_datetime: this.getISODateString(this.start),
			end_datetime: this.getISODateString(this.end),
		}
	}

	private getISODateString(time: string): string {
		const date = new Date()
		date.setDate(this.day)
		date.setMonth(this.month)
		date.setFullYear(this.year)

		const [hours, minutes] = time.split(':').map(Number)
		date.setHours(hours)
		date.setMinutes(minutes)

		return date.toISOString()
	}

	private getTimeString(date: Date): string {
		const hours = date.getHours() <= 9 ? `0${date.getHours()}` : `${date.getHours()}`
		const minutes = date.getMinutes()

		return `${hours}:${minutes}`
	}
}
