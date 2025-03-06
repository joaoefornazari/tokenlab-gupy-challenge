export default interface UserEventRepositoryInterface {
	getAll(): Promise<any[]>;
	get(userId?: string, eventId?: number): Promise<any>;
	create(userId: string, eventId: number): Promise<any>;
	delete(userId: string, eventId: number): Promise<void>;
}