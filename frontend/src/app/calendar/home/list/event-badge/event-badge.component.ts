import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgIf } from '@angular/common'
import { CalendarEvent } from 'src/types';

@Component({
  selector: 'calendar-event-badge',
  imports: [NgIf],
  templateUrl: './event-badge.component.html',
  styleUrls: ['./event-badge.component.css']
})
export class EventBadgeComponent implements OnChanges {
	@Input() public event!: CalendarEvent
	
	private description: string = ""
	private start: string= ""
	private end: string = ""
	private content: string = ""

	private expanded: boolean = false

	constructor() {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['event']) {
			this.setEventFields(this.event)
		}
	}

	public setEventFields(event: CalendarEvent): void {
		this.setDescription(event.description)
		this.setStart(event.start_datetime)
		this.setEnd(event.end_datetime)
		if (event.content) this.setContent(event.content)
	}

	public setDescription(description: string): void {
		this.description = description
	}

	public setStart(start: string): void {
		this.start = new Date(start).toLocaleTimeString('pt', {
			hour: '2-digit',
			minute: '2-digit',
			second: undefined,
		})
	}

	public setEnd(end: string): void {
		this.end = new Date(end).toLocaleTimeString('pt', {
			hour: '2-digit',
			minute: '2-digit',
			second: undefined,
		})
	}

	public setContent(content: string): void {
		this.content = content
	}

	public getDescription(): string {
		return this.description
	}

	public getStart(): string {
		return this.start
	}

	public getEnd(): string {
		return this.end
	}

	public isExpanded(): boolean {
		return this.expanded
	}

	public toggleExpanded(): void {
		this.expanded = !this.expanded
	}

	public hasContent(): boolean {
		return this.content.length > 0
	}

	public getContent(): string {
		return this.content
	}

}
