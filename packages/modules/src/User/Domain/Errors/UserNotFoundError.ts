import {
	BaseError,
	type ErrorOptions,
} from "../../../Shared/Domain/Errors/BaseError";

export class UserNotFoundError extends BaseError {
	constructor(options?: ErrorOptions) {
		super("Error creating user", options);
		Object.setPrototypeOf(this, UserNotFoundError.prototype);
	}
}
