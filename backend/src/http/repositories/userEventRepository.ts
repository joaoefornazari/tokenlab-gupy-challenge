import UserEventRepositoryInterface from "../interfaces/userEventRepositoryInterface.ts";
import GeneratedToken from "../models/generated-token.ts";
import UserEvent from "../models/user-event.ts";

class UserEventRepository implements UserEventRepositoryInterface {
	
	/**
	 * Get all user-event associations.
	 * @returns A list of all user-event associations.
	 */
	async getAll(): Promise<any[]> {
		try {
			const userEvents = await UserEvent.findAll();
			return userEvents.map((ue) => ue.toJSON());
		} catch (error) {
			throw new Error(`Failed to get all user-event association list: ${error}`)
		}
	}

	/**
	 * Get a specific user-event association.
	 * @param userId The user associated to the event.
	 * @param eventId The event associated to the user.
	*/
	async get(userId?: string, eventId?: number): Promise<any> {
		try {
			const userEvent = await UserEvent.findOne({
				where: { userId, eventId }
			})
			return userEvent ? userEvent.toJSON() : null
		} catch (error) {
			throw new Error(`Failed to get all user-event association list: ${error}`)
		}
	}

	/**
	 * Associates an user to an event.
	 * @param userToken A JWT token sent by client.
	 * @param eventId The event ID.
	 */
	async create(userToken: string, eventId: number): Promise<any> {
		try {
			const generatedToken = await GeneratedToken.findOne({ where: { token: userToken } })
			if (!generatedToken) throw new Error('Token not found.')

			const userId = generatedToken.toJSON().userId

			const newUserEvent = await UserEvent.create({ userId, eventId })
			return { id: newUserEvent.toJSON().id }
		} catch (error) {
			throw new Error(`Failed to associate user to event: ${error}`)
		}
	}

	/**
	 * Removes an user-event association.
	 * @param userToken A JWT token sent by client.
	 * @param eventId The event associated to the user.
	 */
	async delete(userToken: string, eventId: number): Promise<void> {
		try {
			const generatedToken = await GeneratedToken.findOne({ where: { token: userToken } })
			if (!generatedToken) throw new Error('Token not found.')

			const userId = generatedToken.toJSON().userId
			await UserEvent.destroy({
				where: { userId, eventId }
			});
		} catch (error) {
			throw new Error(`Failed to delete event: ${error}`);
		}
	}
}

export default UserEventRepository;
