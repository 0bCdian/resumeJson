import { describe, test, expect, beforeAll } from "bun:test";
import { ResumeCreate } from "../../../src/Resume/application/ResumeCreate";
import { CloudStorageResumeRespository } from "../mocks/ResumeRepositoryStub";
import { Job } from "../../../src/Resume/domain/entities/Job";
import { TokenizerService } from "../../../src/Resume/infrastructure/TokenizerService";
import { LlmRepoStub } from "../mocks/LlmRepoStub";
import exampleResume from "../mocks/example.json";
import { $ } from "bun";
const resumeRepositoryPath = "/tmp/JsonResume";
describe("ResumeCreate should", () => {
  beforeAll(async () => {
    try {
      await $`rm -rf ${resumeRepositoryPath}`;
    } catch (e) {
      console.error(e);
    }
  });
  test(
    "Create new resume if there are no cache hits",
    async () => {
      const job = new Job();
      const tokenizer = new TokenizerService();
      const llmRepo = new LlmRepoStub();
      const resumeRepository = new CloudStorageResumeRespository(
        resumeRepositoryPath,
      );

      const resumeCreate = new ResumeCreate(
        resumeRepository,
        llmRepo,
        tokenizer,
        1500,
      );
      const parsedText = JSON.stringify(exampleResume);
      const hash = await tokenizer.hash(parsedText);
      await resumeCreate.run(parsedText, job);
      expect(resumeRepository.get(hash)).not.toBeNull();
    },
    { timeout: 150000 },
  );
});
