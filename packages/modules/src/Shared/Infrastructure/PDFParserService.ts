import type { TextParser } from "../Domain/TextParser";
const { Poppler } = require("node-poppler");
export class PDFParserService implements TextParser {
	async parse(buffer: Buffer): Promise<string> {
		const poppler = new Poppler();
		const text = (await poppler.pdfToText(buffer)) as string;
		return text;
	}
}
