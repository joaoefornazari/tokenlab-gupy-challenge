import { Component } from '@angular/core';

@Component({
  selector: 'calendar-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
	private userName: string = ''
	
	constructor() {
		const cookie = document.cookie
		const name = cookie.match(/name=([^;]*)/);
		if (name) {
			this.userName = name[1].toLocaleUpperCase()
		}
	}

	public getUserName() {
		return this.userName
	}

	public getCurrentRoute(): string {
		const url = window.location.href
		const urlParts = url.split('/')
		return `/${urlParts[urlParts.length - 2]}/${urlParts[urlParts.length - 1]}`
	}
}
