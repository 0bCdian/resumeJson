import type { AIResumeRepository } from "@modules/Resume/Domain/Ports/AIResumeRepository.js";
import type { UserResume } from "@modules/Resume/Domain/Entities/UserResume.js";
import type { JsonResume } from "@modules/Resume/Domain/Entities/JsonResume.js";
import { stubResume } from "./example";
export class MockOpenAIResumeRepository implements AIResumeRepository {
  async create(userResume: UserResume): Promise<JsonResume> {
    return stubResume
  }
}
