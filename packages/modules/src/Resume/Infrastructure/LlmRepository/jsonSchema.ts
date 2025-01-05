import { jsonSchema } from "ai";
import resumeSchema from "../../Domain/Schemas/schema.json";
import type { ResumeSchema } from "../../Domain/Schemas/ResumeSchema";
export const resumeJsonSchema = jsonSchema<ResumeSchema>(resumeSchema);
