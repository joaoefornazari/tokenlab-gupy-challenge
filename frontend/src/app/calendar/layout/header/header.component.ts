import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'calendar-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
	private userName: string = ''
	private api: ApiService

	private token: string = ''
	
	constructor() {
		const cookie = document.cookie
		const name = cookie.match(/name=([^;]*)/)
		if (name) {
			this.userName = name[1].toLocaleUpperCase()
		}

		const token = cookie.match(/token=([^;]*)/)
		if (token) {
			this.token = token[1]
		}

		this.api = new ApiService()
	}

	public getUserName() {
		return this.userName
	}

	public getCurrentRoute(): string {	
		const url = window.location.href
		const urlParts = url.split('/')
		return `/${urlParts[urlParts.length - 2]}/${urlParts[urlParts.length - 1]}`
	}

	public async onLogout() {
		try {
			const result = await this.api.post(`/calendar/users/logout`, { token: this.token })
	
			if (result.status === 'rejected') {
				throw new Error(result.reason.response.data.error)
			}
			// removendo token e nome dos cookies para forçar UI a mandar o user pro login
			document.cookie.replace(/token=[^;]*/, '')
			document.cookie.replace(/name=[^;]*/, '')

			window.location.href = '/calendar/login'

		} catch (error: any) {
			alert(error)
		}
	}
}
