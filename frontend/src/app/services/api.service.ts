import { Injectable } from '@angular/core'
import { ApiInterface } from './api.interface';
import { environment } from 'src/environments/environment';
import { Axios } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements ApiInterface {
	private apiConfig: Record<string, any> = {
		responseType: 'json',
		baseURL: environment.apiUrl,
		timeout: 5000,
		timeoutErrorMessage: 'Error: Request timeout.'
	}

	private axios: Axios

  constructor() {
		this.axios = new Axios(this.getApiConfig())
	}

	private getApiConfig() {
		return this.apiConfig
	}

	public options(url: string): Promise<any> {
		return this.axios.options(url)
	}

	public async get(url: string): Promise<any> {
		return this.options(url).then(() => {
			return this.axios.get(url)
		})
	}

	public async post(url: string, data: any): Promise<any> {
		return this.options(url).then(() => {
			return this.axios.post(url, data)
		})
	}

	public async put(url: string, data: any): Promise<any> {
		return this.options(url).then(() => {
			return this.axios.put(url, data)
		})
	}

	public async delete(url: string): Promise<any> {
		return this.options(url).then(() => {
			return this.axios.delete(url)
		})
	}
}
