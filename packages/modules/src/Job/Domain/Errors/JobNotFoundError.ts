import {
	BaseError,
	type ErrorOptions,
} from "../../../Shared/Domain/Errors/BaseError";

export class JobNotFoundError extends BaseError {
	constructor(options?: ErrorOptions) {
		super("Job not found", options);
		Object.setPrototypeOf(this, JobNotFoundError.prototype);
	}
}
