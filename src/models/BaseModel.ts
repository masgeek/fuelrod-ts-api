import {UserModel} from './UserModel';

export class BaseModel {
	excludeFields<Any, Key extends keyof Any>(
		model: Any,
		keys: Key[],
	): Omit<Any, Key> {
		for (const key of keys) {
			delete model[key];
		}

		return model;
	}
}
