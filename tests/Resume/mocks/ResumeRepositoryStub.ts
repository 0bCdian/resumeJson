import { file, write } from "bun";
import { JsonResume, ResumeRepository } from "../../../src/Resume/domain";
export class CloudStorageResumeRespository implements ResumeRepository {
  private basePath: string;
  constructor(path = "var/JsonResume") {
    this.basePath = path;
  }
  async get(key: string) {
    const filepath = `${this.basePath}/${key}.json`;
    const jsonFile = file(filepath);
    if (!(await jsonFile.exists())) return null;
    return new JsonResume(key, await jsonFile.json());
  }
  async store(resume: JsonResume) {
    const filepath = `${this.basePath}/${resume.id}.json`;
    write(filepath, JSON.stringify(resume.parsedResume));
  }
}
