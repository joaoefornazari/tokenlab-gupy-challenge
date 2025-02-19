export default interface EventRepositoryInterface {
	getAll(): Promise<any[]>; // Get all events
	get(id: number): Promise<any | null>; // Get event by id
	create(event: any): Promise<any>; // Create event
	update(id: number, event: any): Promise<number>; // Update event
	delete(id: number): Promise<void>; // Delete event
}
