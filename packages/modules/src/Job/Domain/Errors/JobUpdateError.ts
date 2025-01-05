import {
	BaseError,
	type ErrorOptions,
} from "../../../Shared/Domain/Errors/BaseError";

export class JobUpdateError extends BaseError {
	constructor(options?: ErrorOptions) {
		super("Error updating job", options);
		Object.setPrototypeOf(this, JobUpdateError.prototype);
	}
}
