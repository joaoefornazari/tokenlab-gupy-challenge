import { Component, OnChanges, SimpleChanges, Input } from '@angular/core'
import { ApiService } from 'src/app/services/api/api.service'
import { DayInfo, CalendarEvent } from 'src/types'
import { EventContextComponent } from './event-context/event-context.component'

@Component({
  selector: 'event-list',
  imports: [EventContextComponent],
  standalone: true,
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnChanges {
	@Input() currentMonth!: number | string
	@Input() currentYear!: number

	public days: DayInfo[] = []
	private maxDays: number = 0
	private api: ApiService

	constructor() {
		this.api = new ApiService()
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['currentMonth'] || changes['currentYear']) {
			this.maxDays = this.setMaxDays(Number(this.currentMonth))
			this.days = this.initDays(this.maxDays)
			this.fetchEvents()
		}
	}

	public getMonthAsNumber() {
		return this.currentMonth as number
	}

	// define o máximo de dias que um dado mês tem.
	public setMaxDays(month: number) {
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

	// verifica se o ano atual é bissexto, quando o mês atual é fevereiro.
	public isLeapYear(year: number) {
		return year % 4 === 0
	}

	public initDays(max: number) {
		const list: DayInfo[] = []
		for (let i = 1; i <= max; i++) {
			list.push({ day: i, events: [] })
		}
		return list
	}

	public async fetchEvents() {
		const cookie = document.cookie.match(/token=([^;]*)/)
		const token = cookie ? cookie[1] : ''

		const { value: { data: response } } = await this.api.get(`/calendar/events?token=${token}`)
		this.days = this.initDays(this.maxDays)
		response.forEach((event: CalendarEvent) => {
			const day = new Date(event.start_datetime).getDate()
			if (
				this.currentMonth === new Date(event.start_datetime).getMonth() &&
        this.currentYear === new Date(event.start_datetime).getFullYear()
			) {
				this.days[day - 1].events.push(event)
			}
		})
	}

}

