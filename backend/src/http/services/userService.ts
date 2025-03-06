import { randomUUID } from 'crypto';
import UserRepository from '../repositories/userRepository.ts';
import GeneratedTokenRepository from '../repositories/generatedTokenRepository.ts';
import { hash } from 'bcrypt';

const SALTROUND = 10

export default class UserService {
	private userRepository: UserRepository;
	private tokenRepository: GeneratedTokenRepository

	constructor(
		userRepository: UserRepository,
		tokenRepository: GeneratedTokenRepository,
	) {
		this.userRepository = userRepository;
		this.tokenRepository = tokenRepository;
	}

	async getAllUsers() {
		return this.userRepository.get();
	}

	async createUser(user: any) {
		if (
			!user.email ||
			!user.password ||
			!user.name
		) {
			throw new Error('Invalid user payload. Check fields again.', { cause: { code: 400 } });
		}

		if (user.password.length < 12) {
			throw new Error('Password must be at least 12 characters long.', { cause: { code: 400 } });
		}

		if (!this.isValidEmail(user.email)) {
			throw new Error('Invalid email.', { cause: { code: 400 } });
		}

		const hashedPassword = await hash(user.password, SALTROUND);
		user.password = hashedPassword;

    Object.assign(user, { id: randomUUID() })

		return this.userRepository.create(user);	
	}

	async deleteUser(id: string) {
		return this.userRepository.delete(id);
	}

	async getUserToLogin(credentials: any) {
		if (
			!credentials.email ||
			!credentials.password ||
			credentials.email.length < 1 ||
			credentials.password.length < 12
		) {
			throw new Error('Invalid login payload. Check fields again.', { cause: { code: 400 } });
		}

		if (!this.isValidEmail(credentials.email)) {
			throw new Error('Invalid email.', { cause: { code: 400 } });
		}

		return this.userRepository.getByCredentials(credentials.email, credentials.password);
	}

	async logoutUser(credentials: any) {
		if (!credentials.token) {
			throw new Error('Invalid logout payload.', { cause: { code: 400 }});
		}

		return this.tokenRepository.delete(credentials.token)
	}


	/* ************************************
		HELPERS
	* *************************************/

	private isValidEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}
}
