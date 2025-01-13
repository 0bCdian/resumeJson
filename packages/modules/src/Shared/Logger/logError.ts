// import pino from "pino";
// const logger = pino();
const logger = console;
export function logError(error: unknown): void {
	if (error instanceof Error) {
		logger.error(error.message);
		if (error.stack) {
			logger.error(error.stack);
		}
	} else {
		logger.error("An unknown error occurred");
	}
}
