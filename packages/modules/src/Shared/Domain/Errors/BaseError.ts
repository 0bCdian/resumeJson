export type Jsonable =
	| string
	| number
	| boolean
	| null
	| undefined
	| readonly Jsonable[]
	| { readonly [key: string]: Jsonable }
	| { toJSON(): Jsonable };

export type ErrorOptions = { error?: Error; context?: Jsonable };
export class BaseError extends Error {
	public readonly context?: Jsonable;

	constructor(message: string, options: ErrorOptions = {}) {
		const { error, context } = options;

		super(message, { cause: error });
		this.name = this.constructor.name;

		this.context = context;
	}
}
