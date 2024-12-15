import { db, User, Role } from 'astro:db';
import { v4 as UUID} from 'uuid'
import bcrypt from 'bcryptjs'

// https://astro.build/db/seed
export default async function seed() {
	// TODO
	const roles = [
		{ id: 'admin', name: 'Admin' },
		{ id: 'user', name: 'User' },
	];

	const users = [
		{ id: UUID(), name: 'John Doe', email: 'john@example.com', password: bcrypt.hashSync('123455'), role: 'admin' },
		{ id: UUID(), name: 'Jane Doe', email: 'jane@example.com', password: bcrypt.hashSync('123455'), role: 'user' },
	]

	await db.insert(Role).values(roles);
	await db.insert(User).values(users);
}
