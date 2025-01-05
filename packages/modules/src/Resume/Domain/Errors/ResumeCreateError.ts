import {
	BaseError,
	type ErrorOptions,
} from "../../../Shared/Domain/Errors/BaseError";

export class ResumeCreateError extends BaseError {
	constructor(options?: ErrorOptions) {
		super("Error creating resume", options);
		Object.setPrototypeOf(this, ResumeCreateError.prototype);
	}
}
