import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'calendar-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
	public formData: {
		email: string
		password: string
	}

	private api: ApiService

	constructor() {
		this.formData = {
			email: '',
			password: '',
		}
		this.api = new ApiService()
	}

	public async onSubmit() {
		try {
			const result = await this.api.post('/calendar/users/login', this.formData)
			if (result.status === 'rejected') {
				throw new Error(result.reason.response.data.error)
			}
			const token = result.value.data.token
			const name = result.value.data.name

			document.cookie = `token=${token}`
			document.cookie = `name=${name}`

			window.location.href = '/calendar'
		
		}	catch (error: any) {
			alert(error)
		}	
	}
}
