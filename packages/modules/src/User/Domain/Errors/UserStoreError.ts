import {
	BaseError,
	type ErrorOptions,
} from "../../../Shared/Domain/Errors/BaseError";

export class UserStoreError extends BaseError {
	constructor(options?: ErrorOptions) {
		super("Error creating user", options);
		Object.setPrototypeOf(this, UserStoreError.prototype);
	}
}
