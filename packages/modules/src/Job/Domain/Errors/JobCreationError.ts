import {
	BaseError,
	type ErrorOptions,
} from "../../../Shared/Domain/Errors/BaseError";

export class JobCreationError extends BaseError {
	constructor(options?: ErrorOptions) {
		super("Error creating job", options);
		Object.setPrototypeOf(this, JobCreationError.prototype);
	}
}
