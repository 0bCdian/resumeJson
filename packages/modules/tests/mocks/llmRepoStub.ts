import type { JsonResume } from "../../src/Resume/Domain/Entities/JsonResume";
import type { UserResume } from "../../src/Resume/Domain/Entities/UserResume";
import type { AIResumeRepository } from "../../src/Resume/Domain/Ports/AIResumeRepository";
import { stubResume } from "./example";
export class MockOpenAIResumeRepository implements AIResumeRepository {
  async create(userResume: UserResume): Promise<JsonResume> {
    return stubResume
  }
}
