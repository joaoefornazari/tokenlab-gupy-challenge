import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'calendar-list',
  imports: [NgFor],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnChanges {
	
	@Input() currentMonth!: number
	@Input() currentYear!: number
	
	protected monthAmountOfDays: number = 0
	protected listDays: { day: number, events: any }[] = []

	constructor() {}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['currentMonth'] || changes['currentYear']) {
			this.updateMonthData()
		}
	}

	updateMonthData() {
		this.monthAmountOfDays = this.setMonthAmountOfDays(this.currentMonth);
    this.listDays = this.setListDays(this.monthAmountOfDays);
	}

	setMonthAmountOfDays(month: number) {
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

	isLeapYear(year: number) {
		return year % 4 === 0
	}

	setListDays(amountOfDays: number) {
		const listDays: { day: number, events: any }[] = []
		for (let i = 1; i <= amountOfDays; i++) {
			listDays.push({ day: i, events: [] })
		}
		return listDays
	}
}