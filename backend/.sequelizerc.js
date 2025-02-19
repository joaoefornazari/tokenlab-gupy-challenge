import path from 'path';
const { resolve } = path;

export default {
	'config': resolve('src', 'database/config.js'),
	'models-path': resolve('src', 'http/models'),
	'seeders-path': resolve('src', 'database/seeders'),
	'migrations-path': resolve('src', 'database/migrations'),
}
