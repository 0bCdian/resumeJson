import {
	BaseError,
	type ErrorOptions,
} from "../../../Shared/Domain/Errors/BaseError";

export class ApiKeyStoringError extends BaseError {
	constructor(options?: ErrorOptions) {
		super("Error storing apikey", options);
		Object.setPrototypeOf(this, ApiKeyStoringError.prototype);
	}
}
