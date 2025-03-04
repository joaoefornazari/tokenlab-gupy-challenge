import { UserRepositoryInterface } from "../interfaces/userRepositoryInterface.ts";
import User from "../models/user.ts";

class UserRepository implements UserRepositoryInterface {

	/**
	 * Get a specific user.
	 * @param id The user id.
	 * @returns The user data.
	 */
	async get(id: string): Promise<any | null> {
		try {
			const user = await User.findByPk(id);
			return user ? user.toJSON() : null;
		} catch (error) {
			throw new Error(`Failed to get user by id: ${error}`);
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
}

export default UserRepository;
