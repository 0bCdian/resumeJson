import type { JsonResume } from "../Entities/JsonResume";

export interface ResumeRepository {
	get: (
		resumeID: string,
		userID: string,
	) => Promise<JsonResume["parsedResume"]>;
	store: (resume: JsonResume, userID: string) => Promise<void>;
}
