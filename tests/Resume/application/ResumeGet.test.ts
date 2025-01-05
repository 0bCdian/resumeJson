import { ResumeGet } from "../../../src/Resume/application/ResumeGet";
import { CacheRespositoryStub } from "../mocks/CacheRespositoryStub";
import { expect, test, describe } from "bun:test";
import { hash } from "bun";
import example from "../mocks/example.json";
import { JsonResume } from "../../../src/Resume/domain";

describe("ResumeGet should", () => {
  test("Get resume from cache", async () => {
    const repository = new CacheRespositoryStub();
    const resumeGet = new ResumeGet(repository);
    const a = hash(example.toString());
    const b = a.toString();
    const result = await resumeGet.run(b);
    expect(result).not.toBeNull();
  });

  test("Return null on non existent key", async () => {
    const repository = new CacheRespositoryStub();
    const resumeGet = new ResumeGet(repository);
    const result = await resumeGet.run("123");
    expect(result).toBeNull();
  });

  test("It returns the correct type", async () => {
    const repository = new CacheRespositoryStub();
    const resumeGet = new ResumeGet(repository);
    const a = hash(example.toString());
    const b = a.toString();
    const result = await resumeGet.run(b);
    expect(result).toBeInstanceOf(JsonResume);
  });
});
