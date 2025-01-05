import { BaseError, type ErrorOptions } from "./BaseError";
export class EnvConfigError extends BaseError {
	constructor(options?: ErrorOptions) {
		super("Error loading env vars, check configuration", options);
		Object.setPrototypeOf(this, EnvConfigError.prototype);
	}
}
