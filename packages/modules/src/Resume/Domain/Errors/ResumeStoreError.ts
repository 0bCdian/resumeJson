import {
	BaseError,
	type ErrorOptions,
} from "../../../Shared/Domain/Errors/BaseError";
export class ResumeStoreError extends BaseError {
	constructor(options?: ErrorOptions) {
		super("Error storing resume", options);
		Object.setPrototypeOf(this, ResumeStoreError.prototype);
	}
}
