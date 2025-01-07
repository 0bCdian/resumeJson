import {  beforeAll, beforeEach, describe, expect, it } from "vitest";
import { FireStoreJobRepository } from "@/Job/Infrastructure/FireStoreJobRepository";
import { JobNotFoundError } from "@/Job/Domain/Errors/JobNotFoundError";
import { db } from "@tests/config/configureEmulator";

describe("FireStoreJobRepository Integration", () => {
  const jobRepository = new FireStoreJobRepository(db, 3600000); // 1 hour cache
  const userId = "test-user-123";
  const jobId = "test-job-123";

  beforeAll(async () => {
    // Clear any existing data
    const collections = await db.listCollections();
    await Promise.all(
      collections.map((collection) => db.recursiveDelete(collection)),
    );
  });

    describe("store", () => {
    it("should store a new job", async () => {
      const job = {
        id: jobId,
        status: "pending" as const,
      };

      await jobRepository.store(job, userId);
      const stored = await jobRepository.get(jobId, userId);

      expect(stored).toEqual(job);
    });
  });

  describe("get", () => {
    it("should throw JobNotFoundError for non-existent job", async () => {
      await expect(jobRepository.get("non-existent", userId))
        .rejects.toThrow(JobNotFoundError);
    });

    it("should get an existing job", async () => {
      const job = {
        id: "existing-job",
        status: "pending" as const,
      };

      await jobRepository.store(job, userId);
      const result = await jobRepository.get(job.id, userId);

      expect(result).toEqual(job);
    });
  });

  describe("update", () => {
    beforeEach(async () => {
      const job = {
        id: jobId,
        status: "pending" as const,
      };
      await jobRepository.store(job, userId);
    });
    it("should update job to failed status", async () => {
      const updateInfo = {
        jobID: jobId,
        status: "failed" as const,
        error: "Processing failed",
      };

      await jobRepository.update(updateInfo, userId);
      const updated = await jobRepository.get(jobId, userId);
      expect(updated).toEqual({
        id: jobId,
        status: "failed",
        error: "Processing failed",
      });
    });

    it("should update job to successful status", async () => {
      const updateInfo = {
        jobID: jobId,
        status: "successful" as const,
        resourceLocation: "path/to/resource",
      };

      await jobRepository.update(updateInfo, userId);
      const updated = await jobRepository.get(jobId, userId);

      expect(updated).toEqual({
        id: jobId,
        status: "successful",
        resourceLocation: "path/to/resource",
      });
    });
  });
});
