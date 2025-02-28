import { Component } from '@angular/core';
import { EventListComponent } from './event-list/event-list.component'

@Component({
  selector: 'calendar-home',
	standalone: true,
  imports: [EventListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
	private today = new Date()
	private current: Date

	constructor() {
		this.current = this.today
	}

	public getTodayMonth(): number {
		return this.today.getMonth()
	}

	public getTodayDay(): number {
		return this.today.getDate()
	}

	public getTodayYear(): number {
		return this.today.getFullYear()
	}
	
	public getCurrentMonth(type: 'number' | 'name'): string | number {
		return type === 'name' 
			? this.current.toLocaleString('pt', { month: 'long' }).toUpperCase()
			: this.current.getMonth()
	}
		
	public getCurrentDay() {
		return this.current.getDay()
	}
		
	public getCurrentYear() {
		return this.current.getFullYear()
	}
	
	public changeCurrentMonth(month: 'previous' | 'next' | number) {
		const newMonth = (month === 'previous' ? this.current.getMonth() - 1 : this.current.getMonth() + 1)
		this.current.setMonth(newMonth)
		return 
	}
	
	public changeCurrentYear(year: number) {
		this.current.setFullYear(year)
		return
	}
	
	public changeCurrentDay(day: number) {
		this.current.setDate(day)
		return
	}
	
	public backToToday() {
		this.current = this.today
		return
	}

}
