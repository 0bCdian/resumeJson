import {
	BaseError,
	type ErrorOptions,
} from "../../../Shared/Domain/Errors/BaseError";

export class ApiKeyDeleteError extends BaseError {
	constructor(options?: ErrorOptions) {
		super("Error deleting apikey", options);
		Object.setPrototypeOf(this, ApiKeyDeleteError.prototype);
	}
}
