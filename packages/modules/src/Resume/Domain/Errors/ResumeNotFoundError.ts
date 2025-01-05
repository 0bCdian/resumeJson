import {
	BaseError,
	type ErrorOptions,
} from "../../../Shared/Domain/Errors/BaseError";
export class ResumeNotFoundError extends BaseError {
	constructor(options?: ErrorOptions) {
		super("Resume not found", options);
		Object.setPrototypeOf(this, ResumeNotFoundError.prototype);
	}
}
