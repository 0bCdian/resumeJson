import { JsonResume, ResumeRepository } from "../../../src/Resume/domain";
import { db } from "./StubDbCache";

export class CacheRespositoryStub implements ResumeRepository {
  async get(key: string) {
    const result = db[key] as string | undefined;
    if (result === undefined) return null;
    const parsedJson = JSON.parse(result);
    const newJson = new JsonResume("1", parsedJson);
    return newJson;
  }
  async store(resume: JsonResume) {
    db[resume.id] = JSON.stringify(resume.parsedResume);
  }
}
