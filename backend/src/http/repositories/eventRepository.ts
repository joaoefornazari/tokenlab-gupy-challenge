import EventRepositoryInterface from '../interfaces/eventRepositoryInterface';
import Event from '../models/event';

class EventRepository implements EventRepositoryInterface {

	/**
	 * Get all events.
	 * @returns A list of all events.
	 */
	async getAll(): Promise<any> {
		try {
			const events = await Event.findAll();
			return events.map(evt => evt.toJSON());
		} catch (error) {
			throw new Error(`Failed to get all events: ${error}`);
		}
	}

	/**
	 * Get a specific event.
	 * @param id The event id.
	 * @returns The event data.
	 */
	async get(id: number): Promise<any | null> {
		try {
			const event = await Event.findByPk(id);
			return event ? event.toJSON() : null;
		} catch (error) {
			throw new Error(`Failed to get event by id: ${error}`);
		}
	}

	/**
	 * Create a new event.
	 * @param event The event data.
	 * @returns The ID of the created event.
	 */
	async create(event: any): Promise<any> {
		try {
			const newEvent = await Event.create(event);
			return { id: newEvent.toJSON().id };
		} catch (error) {
			throw new Error(`Failed to create event: ${error}`);
		}
	}

	/**
	 * Update an existing event.
	 * @param id The event id.
	 * @param event The event data.
	 * @returns The updated 
	 */
	async update(id: number, event: any): Promise<number> {
		try {
			const [affectedRows] = await Event.update(event, {
				where: { id }
			});
			return affectedRows;
		} catch (error) {
			throw new Error(`Failed to update event: ${error}`);
		}
	}

	/**
	 * Delete an event.
	 * @param id The event id.
	 */
	async delete(id: number): Promise<void> {
		try {
			await Event.destroy({
				where: { id }
			});
		} catch (error) {
			throw new Error(`Failed to delete event: ${error}`);
		}
	}

}

export default EventRepository;