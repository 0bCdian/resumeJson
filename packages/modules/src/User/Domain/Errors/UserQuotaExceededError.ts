import {
	BaseError,
	type ErrorOptions,
} from "../../../Shared/Domain/Errors/BaseError";

export class UserQuotaExceededError extends BaseError {
	constructor(options?: ErrorOptions) {
		super(
			"Error updating user quota, out of api calls left for the month",
			options,
		);
		Object.setPrototypeOf(this, UserQuotaExceededError.prototype);
	}
}
