import { JobCreate } from "@/Job/Application/JobCreate";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("JobCreate", () => {
	const mockJobRepository = {
		store: vi.fn(),
		get: vi.fn(),
		update: vi.fn(),
	};

	const jobCreate = new JobCreate(mockJobRepository);
	const userId = "test-user-id";

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should create a new job", async () => {
		const result = await jobCreate.run(userId);

		expect(result).toBeDefined();
		expect(mockJobRepository.store).toHaveBeenCalledTimes(1);
	});

	it("should handle repository errors", async () => {
		mockJobRepository.store.mockRejectedValue(new Error("Store failed"));

		await expect(jobCreate.run(userId)).rejects.toThrow("Store failed");
		expect(mockJobRepository.store).toHaveBeenCalledTimes(1);
	});
});
