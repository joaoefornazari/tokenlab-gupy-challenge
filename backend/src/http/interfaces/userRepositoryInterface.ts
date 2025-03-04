export interface UserRepositoryInterface {
	get(id: string): Promise<any | null>
	getByCredentials(email: string, password: string): Promise<any | null>
	create(user: any): Promise<any>
	delete(id: string): Promise<void>
}
