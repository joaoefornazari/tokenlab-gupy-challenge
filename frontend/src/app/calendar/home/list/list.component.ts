import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgFor } from '@angular/common';
import { EventBadgeComponent } from './event-badge/event-badge.component';
import { CalendarEvent, DayInfo } from 'src/types';
import { EventFormComponent } from './event-form/event-form.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'calendar-list',
  imports: [NgFor, EventBadgeComponent, EventFormComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnChanges {
	@Input() currentMonth!: number | string
	@Input() currentYear!: number
	
	private monthAmountOfDays: number = 0
	private listDays: DayInfo[] = []
	private api: ApiService

	constructor() {
		this.api = new ApiService()
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['currentMonth'] || changes['currentYear']) {
			this.monthAmountOfDays = this.setMonthAmountOfDays(Number(this.currentMonth));
			this.listDays = this.initializeListDays(this.monthAmountOfDays);
			this.fetchEvents()
		}
	}

	public getMonthAsNumber() {
		return this.currentMonth as number
	}

	public setMonthAmountOfDays(month: number) {
		if (
			month === 0 || // janeiro
			month === 2 || // março
			month === 4 || // maio
			month === 6 || // julho
			month === 7 || // agosto
			month === 9 || // outubro
			month === 11 // dezembro
		) {
			return 31
		}

		if (month === 1) {
			return this.isLeapYear(this.currentYear) ? 29 : 28 
		}

		// Não sendo nenhum dos meses acima, será um mês que tem 30 dias.
		return 30
	}

	public isLeapYear(year: number) {
		return year % 4 === 0
	}

	public initializeListDays(amountOfDays: number) {
		const listDays: DayInfo[] = []
		for (let i = 1; i <= amountOfDays; i++) {
			listDays.push({ day: i, events: [] })
		}
		return listDays
	}

	public getListDays(): any[] {
		return this.listDays
	}

	private getEventDay(event: string): number {
		const date = new Date(event)
		return date.getDate()
	}

	private getEventMonth(event: string): number {
		const date = new Date(event)
		return date.getMonth()
	}

	public async fetchEvents() {
		const { value: { data: response } } = await this.api.get('/calendar/events')
		response.forEach((event: CalendarEvent) => {
			const eventDay = this.getEventDay(event.start_datetime)
			if (this.currentMonth === this.getEventMonth(event.start_datetime)) {
				this.listDays[eventDay - 1].events.push(event)
			}
		})
	}
}