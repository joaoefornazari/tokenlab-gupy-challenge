import { Injectable } from '@angular/core'
import { ApiInterface } from './api.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements ApiInterface {
	private apiConfig: Record<string, any> = {
		responseType: 'json'
	}

  constructor(private http: HttpClient) { }

	private getApiConfig() {
		return this.apiConfig
	}

	public get(url: string): Observable<Object> {
		return this.http.get(`${environment.apiUrl}${url}`, this.getApiConfig())
	}

	public post(url: string, data: any): Observable<Object> {
		return this.http.post(`${environment.apiUrl}${url}`, data, this.getApiConfig())
	}

	public put(url: string, data: any): Observable<Object> {
		return this.http.put(`${environment.apiUrl}${url}`, data, this.getApiConfig())
	}

	public delete(url: string): Observable<Object> {
		return this.http.delete(`${environment.apiUrl}${url}`, this.getApiConfig())
	}
}
