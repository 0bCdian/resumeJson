import {
	BaseError,
	type ErrorOptions,
} from "../../../Shared/Domain/Errors/BaseError";

export class ApiKeyValidationError extends BaseError {
	constructor(options?: ErrorOptions) {
		super("Error validating api", options);
		Object.setPrototypeOf(this, ApiKeyValidationError.prototype);
	}
}
