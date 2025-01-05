import { generateObject, type LanguageModelV1 } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { resumeJsonSchema } from "./jsonSchema.js";
import { ResumeCreateError } from "../../Domain/Errors/ResumeCreateError.js";
import { EnvConfigError } from "../../../Shared/Domain/Errors/EnvConfigError.js";
import type { AIResumeRepository } from "../../Domain/Ports/AIResumeRepository.js";
import type { UserResume } from "../../Domain/Entities/UserResume.js";
import type { JsonResume } from "../../Domain/Entities/JsonResume.js";
import { BaseError } from "../../../Shared/Domain/Errors/BaseError.js";

const systemMessage = `Your task is to analyze a text that represents a resume, you are an expert at extracting
data from resumes and inferring missing information to fill the schema.
Group skills by related topics, like softskills, programming languages, frameworks.
Try to separate skills into different related topics, like for example:

Cloud: aws,gcp,terraform,kubernetes,docker.
Languages: Javascript, Typescript, C, Python.
Frameworks: Spring, Nextjs,React,Vue.

You will be given a json schema to follow to the tee, transform the original text into the required
schema as accurately as possible. Infer from the resume the required data to fill the schema.

Return the json following said schema in order, if the resume is out of order relative to the
schema, follow the schema, do not use the order of the resume. This is to produce json objects
as consistent as possible with the schema.
`;

const promptMessage = "Here is a text resume you will analyze:\n";

export class OpenAIResumeRepository implements AIResumeRepository {
	model: LanguageModelV1;

	constructor(apiKey: string | undefined) {
		if (apiKey === undefined) throw new EnvConfigError();
		const GPT_MODEL = "gpt-4o-mini";
		const openai = createOpenAI({
			apiKey,
		});
		this.model = openai(GPT_MODEL);
	}

	async create(userResume: UserResume): Promise<JsonResume> {
		try {
			const system = systemMessage;
			const prompt = promptMessage + userResume.content;
			const { object } = await generateObject({
				system,
				model: this.model,
				mode: "json",
				prompt,
				schema: resumeJsonSchema,
			});
			return {
				parsedResume: object,
				id: userResume.hash,
			};
		} catch (error) {
			if (error instanceof Error) {
				throw new ResumeCreateError({
					error,
					context: {
						resume: userResume.content,
						resumeHash: userResume.hash,
					},
				});
			}
			throw new BaseError(`Unknown Error ${error}`);
		}
	}
}
