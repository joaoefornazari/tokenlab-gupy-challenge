import EventRepository from "../repositories/eventRepository.ts";
import GeneratedToken from "../models/generated-token.ts";

class EventService {
	private eventRepository: EventRepository;

	constructor(eventRepository: EventRepository) {
		this.eventRepository = eventRepository;
	}

	async getEvents(token: string) {
    const generatedToken = await GeneratedToken.findOne({ where: { token } });
    if (!generatedToken) throw new Error('Token not found.');

    const userId = generatedToken.toJSON().userId

		return await this.eventRepository.getAll(userId);	
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
			!(event.description && event.description.length > 0) ||
			!(event.start_datetime && event.start_datetime.length > 0) ||
			!(event.end_datetime && event.end_datetime.length > 0)
		) {
			throw new Error('Invalid event payload. Check fields again.', { cause: { code: 400 } });
		}

		if (
			new Date(event.start_datetime) > new Date(event.end_datetime)
		) {
			throw new Error('Event datetime start and end are not valid.', { cause: { code: 400 } });
		}

		if (event.token) {
			delete event.token
		}

		return await this.eventRepository.create(event);
	}

	async updateEvent(id: string, event: any) {
		const parsedId = parseInt(id);

		if (
			event.start_datetime.length === 0 ||
			event.end_datetime.length === 0
		) {
			throw new Error('Invalid event payload. Check fields again.', { cause: { code: 400 } });
		}

		if (
			new Date(event.start_datetime) > new Date(event.end_datetime)
		) {
			throw new Error('Event datetime start and end are not valid.', { cause: { code: 400 } });
		}

		return await this.eventRepository.update(parsedId, event);
	}
}

export default EventService;
