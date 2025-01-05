import {
	BaseError,
	type ErrorOptions,
} from "../../../Shared/Domain/Errors/BaseError";

export class ApiKeyNotFoundError extends BaseError {
	constructor(options?: ErrorOptions) {
		super("Api key not found", options);
		Object.setPrototypeOf(this, ApiKeyNotFoundError.prototype);
	}
}
