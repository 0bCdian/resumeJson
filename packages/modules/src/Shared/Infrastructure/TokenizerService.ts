import { encodingForModel } from "js-tiktoken";
import type { Tokenizer } from "../Domain/Tokenizer";
import { hash as hasher } from "bun";
const model = "gpt-4o-mini";

export class TokenizerService implements Tokenizer {
	async countTokens(text: string) {
		const encoder = encodingForModel(model);
		const tokens = encoder.encode(text);
		return tokens.length;
	}
	async hash(text: string) {
		return hasher.murmur32v2(text).toString();
	}
}
