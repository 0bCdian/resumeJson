import type { User } from "../../../User/Domain/Schemas/UserSchema";
import { EmptyResumeError } from "../Errors/EmptyResumeError";
import { ResumeCreateError } from "../Errors/ResumeCreateError";
export class UserResume {
	constructor(
		public content: string,
		public tokens: number,
		public hash: string,
		public user: User,
	) {
		this.content = content;
		this.tokens = tokens;
		this.validateTokenCount();
	}
	private validateTokenCount() {
		if (this.tokens > this.user.maxTokensPerRequests) {
			throw new ResumeCreateError({
				context: `maxTokensPerRequest exceeded, max ${this.user.maxTokensPerRequests}, actual: ${this.tokens}`,
			});
		}
		if (this.tokens === 0) {
			throw new EmptyResumeError();
		}
	}
}
