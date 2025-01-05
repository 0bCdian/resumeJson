import type { JsonResume } from "../Entities/JsonResume";
import type { UserResume } from "../Entities/UserResume";

export interface AIResumeRepository {
	create: (userResume: UserResume) => Promise<JsonResume>;
}
