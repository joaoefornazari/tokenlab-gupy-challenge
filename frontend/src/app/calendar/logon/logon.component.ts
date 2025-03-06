import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'calendar-logon',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './logon.component.html',
	styleUrls: ['./logon.component.css']
})
export class LogonComponent {
	public formData: {
		email: string
		name: string
		password: string
		confirmPassword: string
	}

	private api: ApiService

	constructor() {
		this.formData = {
			email: '',
			name: '',
			password: '',
			confirmPassword: ''
		}
		this.api = new ApiService()
	}

	public onCancel() {
		window.location.href = '/calendar/login'
	}

	public async onSubmit() {
		try {
			if (this.formData.password !== this.formData.confirmPassword) {
				throw new Error('Passwords don\'t match.')
			}

			const result = await this.api.post('/calendar/users', this.formData)
			if (result.status === 'rejected') {
				throw new Error(result.reason.response.data.error)
			}
			window.location.href = '/calendar/login'
		
		}	catch (error: any) {
			alert(error)
		}	
	}
}
