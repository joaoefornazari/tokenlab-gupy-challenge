import { Component, Input } from '@angular/core';
import { ListComponent as CalendarList } from './list/list.component';

@Component({
  selector: 'app-home',
  imports: [CalendarList],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
	private today = new Date()
	protected current: Date

	constructor() {
		this.current = this.today
	}

	public getTodayMonth() {
		return this.today.getMonth()
	}

	public getTodayDay() {
		return this.today.getDay()
	}

	public getTodayYear() {
		return this.today.getFullYear()
	}
	
	public getCurrentMonth(type: 'number' | 'name') {
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
