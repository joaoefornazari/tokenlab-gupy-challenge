export interface UserRepositoryInterface {
	get(): Promise<any[]>
	getByCredentials(email: string, password: string): Promise<any | null>
	create(user: any): Promise<any>
	delete(id: string): Promise<void>
}
