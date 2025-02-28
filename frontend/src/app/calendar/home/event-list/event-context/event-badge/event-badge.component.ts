import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core'
import { CalendarEvent } from 'src/types'

@Component({
  selector: 'event-badge',
  imports: [],
  standalone: true,
  templateUrl: './event-badge.component.html', 
  styleUrls: ['./event-badge.component.css']
})
export class EventBadgeComponent {
	@Input()
	public event!: CalendarEvent

	private eventStart: string = ''
	private eventEnd: string = ''

	@Output()
	public startDelete = new EventEmitter<any>()

	@Output()
	public startEdit = new EventEmitter<any>()

	private expanded: boolean = false

	constructor() {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['event']) {
			this.eventStart = this.formatTime(this.event.start_datetime)
			this.eventEnd = this.formatTime(this.event.end_datetime)
		}
	}

	public isExpanded(): boolean {
		return this.expanded
	}

	public toggleExpanded(): void {
		this.expanded = !this.expanded
	}

	public formatTime(time: string): string {
		return new Date(time).toLocaleTimeString('pt', {
			hour: '2-digit',
			minute: '2-digit',
			second: undefined,
		})
	}

	public getStart() {
		return this.eventStart
	}

	public getEnd() {
		return this.eventEnd
	}

	public startEditingEvent() {
		this.startEdit.emit(this.event)
	}

	public startDeletingEvent() {
		this.startDelete.emit(this.event)
	}

	public getContent() {
		return this.event.content && this.event.content.length > 0 ? this.event.content : 'No content to show.'
	}

}
