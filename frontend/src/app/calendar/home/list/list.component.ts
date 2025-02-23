import { Component, Input, OnChanges, SimpleChanges, model, ModelSignal } from '@angular/core';
import { NgFor } from '@angular/common';
import { EventBadgeComponent } from './event-badge/event-badge.component';
import { DayInfo } from 'src/types';
import { EventFormComponent } from './event-form/event-form.component';

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

	constructor() {}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['currentMonth'] || changes['currentYear']) {
			this.updateMonthData()
		}
	}

	public updateMonthData() {
		this.monthAmountOfDays = this.setMonthAmountOfDays(Number(this.currentMonth));
    this.listDays = this.setListDays(this.monthAmountOfDays);
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

	public setListDays(amountOfDays: number) {
		const listDays: DayInfo[] = []
		for (let i = 1; i <= amountOfDays; i++) {
			listDays.push({ day: i, events: [] })
		}
		return listDays
	}

	public getListDays(): any[] {
		return this.listDays
	}
}