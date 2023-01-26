import {User} from "./User";

export class BaseModel {

    excludeFields<Any, Key extends keyof Any>(
        model: Any,
        keys: Key[]
    ): Omit<Any, Key> {
        for (let key of keys) {
            delete model[key]
        }
        return model
    }
}