import {
	BaseError,
	type ErrorOptions,
} from "../../../Shared/Domain/Errors/BaseError";
export class EmptyResumeError extends BaseError {
	constructor(options?: ErrorOptions) {
		super("Resume is empty", options);
		Object.setPrototypeOf(this, EmptyResumeError.prototype);
	}
}
