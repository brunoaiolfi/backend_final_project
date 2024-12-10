import ContentEntity from "../../../../domain/entities/content/ContentEntity";
import ContentModel from "../../../models/ContentModel";
import ContentRepository from "../../../repositories/content/ContentRepository";
import AbstractHandler from "../AbstractHandler";
import { LanguageModelProcessor } from "../../../../infra/Implementations/languageModelProcessor/LanguageModelProcessor";

class ContentHandler extends AbstractHandler<ContentModel, ContentEntity> {
    constructor() {
        super(ContentRepository);
    }

    public async handleGenerateEmbeddings(text: string) {
        const chunks = await LanguageModelProcessor.splitInChunks(text);
        return await LanguageModelProcessor.generateEmbedding(chunks);
    }

    public async searchByEmbeddings(embedding: number[]) {
        return await this.repository.searchByEmbeddings(embedding);
    }
}

export default ContentHandler;