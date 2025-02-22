export interface CalendarEvent {
	description: string
	start_datetime: string
	end_datetime: string
	content?: string
}

export interface DayInfo {
	day: number
	events: CalendarEvent[]
}
