import {
  AIResumeRepository,
  JsonResume,
  UserResume,
} from "../../../src/Resume/domain";
import { stubResume } from "./example";
export class LlmRepoStub implements AIResumeRepository {
  async create(userResume: UserResume) {
    // Simulate llm response time
    await Bun.sleep(10000);
    const newResume = new JsonResume(userResume.hash, stubResume.parsedResume);
    return newResume;
  }
}
