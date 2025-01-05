import { encoding_for_model } from "tiktoken";
import type { Tokenizer } from "../domain/Tokenizer";
import { hash as hasher } from "bun";
const model = "gpt-4o-mini";

export class TokenizerService implements Tokenizer {
	async countTokens(text: string) {
		const encoder = encoding_for_model(model);
		const tokens = encoder.encode(text);
		encoder.free();
		return tokens.length;
	}
	async hash(text: string) {
		return hasher.murmur32v2(text).toString();
	}
}
