import type { TextParser } from "../Domain/TextParser";

export class TextParserService implements TextParser {
	async parse(buffer: Buffer): Promise<string> {
		const parsedText = String(buffer);
		return parsedText;
	}
}
