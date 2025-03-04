import { UserRepositoryInterface } from "../interfaces/userRepositoryInterface.ts";
import User from "../models/user.ts";
import { compare } from "bcrypt";

class UserRepository implements UserRepositoryInterface {

	/**
	 * Get all stored users.
	 * @returns The users list..
	 */
	async get(): Promise<any | null> {
		try {
			const users = await User.findAll()
			return users.map(user => user.toJSON());
		} catch (error) {
			throw new Error(`Failed to get users: ${error}`);
		}
	}

	/**
	 * Create a new user.
	 * @param user The user credentials.
	 * @returns A 'Success' message to avoid exposing data.
	 */
	async create(user: any): Promise<any> {
		try {
			const newUser = await User.create(user);
			return { message: 'success' }
		} catch (error) {
			throw new Error(`Failed to create user: ${error}`);
		}
	}

	/**
	 * Delete an user.
	 * @param id The user id.
	 */
	async delete(id: string): Promise<void> {
		try {
			await User.destroy({
				where: { id }
			});
		} catch (error) {
			throw new Error(`Failed to delete user: ${error}`);
		}
	}

	/**
	 * Get an user through its credentials.
	 * @param email The user email
	 * @param password The user password
	 */
	async getByCredentials(email: string, password: string) {
		try {
			const user = await User.findOne({
				where: {
					email: email,
				}
			});

			if (!user) {
				throw new Error('Not found.', { cause: { code: 404 } })
			}

			const isPasswordValid = await compare(password, user.get().password);

			if (!isPasswordValid) {
				throw new Error('Wrong password. Try again.', { cause: { code: 400 }});
			}

			const response = user ? user.toJSON() : null;
			delete response.id;
			return response;

		} catch (error) {
			throw new Error(`Failed to get user by credentials: ${error}`);
		}
	}
}

export default UserRepository;
