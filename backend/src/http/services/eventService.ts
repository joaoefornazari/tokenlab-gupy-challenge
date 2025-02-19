import EventRepository from "../repositories/eventRepository";

class EventService {
	protected eventRepository: EventRepository;

	constructor() {
		this.eventRepository = new EventRepository();
	}

	async getEvents() {
		return await this.eventRepository.getAll();	
	}

	async getEvent(id: string) {
		const parsedId = parseInt(id);
		return await this.eventRepository.get(parsedId);
	}

	async deleteEvent(id: string) {
		const parsedId = parseInt(id);
		return await this.eventRepository.delete(parsedId);
	}

	async createEvent(event: any) {
		
		// Validate event
		if (
			!event.description ||
			!event.start_datetime ||
			!event.end_datetime
		) {
			throw new Error('Invalid event');
		}

		return await this.eventRepository.create(event);
	}

	async updateEvent(id: string, event: any) {
		const parsedId = parseInt(id);
		return await this.eventRepository.update(parsedId, event);
	}
}

export default EventService;
