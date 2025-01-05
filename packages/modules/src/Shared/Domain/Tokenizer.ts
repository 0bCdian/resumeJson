export interface Tokenizer {
	countTokens: (text: string) => Promise<number>;
	hash: (text: string) => Promise<string>;
}
