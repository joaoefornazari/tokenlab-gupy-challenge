import { Injectable } from '@angular/core'
import { ApiInterface } from './api.interface';
import { environment } from 'src/environments/environment';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements ApiInterface {
	private apiConfig: Record<string, any> = {
		responseType: 'json',
		baseURL: environment.apiUrl,
		timeout: 5000,
		timeoutErrorMessage: 'Error: Request timeout.',
		withCredentials: false,
		headers: {
				'Content-Type': 'application/json'
		}
	}

	private axios: AxiosInstance

  constructor() {
		this.axios = axios.create(this.getApiConfig())
	}

	private getApiConfig() {
		return this.apiConfig
	}

	public async options(url: string): Promise<any> {
		return this.axios.options(url)
	}

	private async userRequest(promises: Promise<any>[]): Promise<any> {
		const responses = await Promise.allSettled(promises);
		const [ preflight, response ]  = responses
		return response
	}

	public async get(url: string): Promise<any> {
		return await this.userRequest([this.options(url), this.axios.get(url)]);
	}

	public async post(url: string, data: any): Promise<any> {
		return await this.userRequest([this.options(url), this.axios.post(url, data)]);
	}

	public async put(url: string, data: any): Promise<any> {
		return await this.userRequest([this.options(url), this.axios.put(url, data)]);
	}

	public async delete(url: string): Promise<any> {
		return await this.userRequest([this.options(url), this.axios.delete(url)]);
	}
}
