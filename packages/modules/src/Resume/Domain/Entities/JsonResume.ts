import type { ResumeSchema } from "../Schemas/ResumeSchema";

export class JsonResume {
	id: string;
	parsedResume: ResumeSchema;
	constructor(id: string, parsedResume: ResumeSchema) {
		this.id = id;
		this.parsedResume = parsedResume;
	}
}
