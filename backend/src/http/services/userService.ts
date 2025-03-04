import UserRepository from '../repositories/userRepository.ts';
import { hash } from 'bcrypt';

const SALTROUND = 10

export default class UserService {
	private userRepository: UserRepository;

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	async getUser(id: string) {
		return this.userRepository.get(id);
	}

	async createUser(user: any) {
		if (
			!user.email ||
			!user.password
		) {
			throw new Error('Invalid user payload. Check fields again.');
		}

		if (user.password.length < 12) {
			throw new Error('Password must be at least 12 characters long.');
		}

		if (!this.isValidEmail(user.email)) {
			throw new Error('Invalid email');
		}

		const hashedPassword = await hash(user.password, SALTROUND);
		user.password = hashedPassword;

		return this.userRepository.create(user);	
	}

	async deleteUser(id: string) {
		return this.userRepository.delete(id);
	}

	private isValidEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}
}
