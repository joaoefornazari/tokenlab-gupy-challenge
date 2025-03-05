import { Component } from '@angular/core';

@Component({
  selector: 'calendar-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
	constructor() {}

	public get currentRoute(): string {
		const url = window.location.href
		const urlParts = url.split('/')
		return `/${urlParts[urlParts.length - 2]}/${urlParts[urlParts.length - 1]}`
	}
}
