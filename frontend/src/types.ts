export interface CalendarEvent {
	id?: number
	description: string
	start_datetime: string
	end_datetime: string
	content?: string
}

export interface DayInfo {
	day: number
	events: CalendarEvent[]
}

export type Action = 'add' | 'delete' | 'read' | 'edit'

export type EventProp = 'id' | 'day' | 'month' | 'year' | 'start' | 'end' | 'description' | 'content'
