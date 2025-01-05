export interface TextParser {
	parse: (buffer: Buffer) => Promise<string>;
}
