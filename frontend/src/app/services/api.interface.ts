import { Observable } from "rxjs"

export interface ApiResponse {
	status: {
		message: string
		code: number
	}
	data?: {
		error?: any
		[key: string]: any
	}
}

export interface ApiInterface {
	get(url: string): Observable<Object>
	post(url: string, data: any): Observable<Object>
	put(url: string, data: any): Observable<Object>
	delete(url: string): Observable<Object>
}
