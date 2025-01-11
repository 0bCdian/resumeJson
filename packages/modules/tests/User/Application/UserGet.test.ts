import { describe, it, expect, beforeAll } from "vitest";
import { UserGet } from "@/User/Application/UserGet";
import { FireStoreUserRepository } from "@/User/Infrastructure/FireStoreUserRepository";
import { exampleUser } from "@tests/mocks/example";
import { db } from "@tests/config/configureEmulator";
describe("UserGet", () => {
	const userRepo = new FireStoreUserRepository(db);
	const userGet = new UserGet(userRepo);
	beforeAll(async () => {
		await userRepo.store(exampleUser);
	});
	it("should get a user", async () => {
		const result = await userGet.run(exampleUser.id);
		expect(result).toEqual(exampleUser);
	});

	it("should return null and log error on failure", async () => {
		const result = await userGet.run("asdf");
		expect(result).toBeNull();
	});
});
