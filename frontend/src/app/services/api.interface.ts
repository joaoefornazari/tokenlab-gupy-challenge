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
	get(url: string): Promise<any>
	post(url: string, data: any): Promise<any>
	put(url: string, data: any): Promise<any>
	delete(url: string): Promise<any>
}
