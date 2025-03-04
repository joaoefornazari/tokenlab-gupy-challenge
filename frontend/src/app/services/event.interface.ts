import { CalendarEvent } from 'src/types'

export interface EventServiceInterface {
	day: number
	month: number
	year: number

	start: string
	end: string

	description: string
	content: string

	setEventProps(event: CalendarEvent): void
	getEventProp(propName: string): any
	setEventProp(propName: string, value: any): void
	getEventPayload(): CalendarEvent
}
