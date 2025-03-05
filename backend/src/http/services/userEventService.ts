import UserEventRepository from '../repositories/userEventRepository.ts'

class UserEventService {
	private userEventRepository: UserEventRepository

	constructor(userEventRepository: UserEventRepository) {
		this.userEventRepository = userEventRepository;
	}

	async getUserEvents() {
		return await this.userEventRepository.getAll();
	}

	async addEventToUser(payload: { userToken: string, eventId: string }) {
		const eventId = parseInt(payload.eventId);
		const { userToken } = payload;
		return await this.userEventRepository.create(userToken, eventId);
	}

	async removeEventFromUser(payload: { userToken: string, eventId: string }) {
		const eventId = parseInt(payload.eventId);
		const { userToken } = payload;
		return await this.userEventRepository.delete(userToken, eventId);
	}
}

export default UserEventService;