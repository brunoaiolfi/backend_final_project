import { EmbeddingModel, FlagEmbedding } from "fastembed";
import ContentEntity from "../../../../domain/entities/content/ContentEntity";
import ContentModel from "../../../models/ContentModel";
import ContentRepository from "../../../repositories/content/ContentRepository";
import AbstractHandler from "../AbstractHandler";
import { CharacterTextSplitter } from "langchain/text_splitter";

class ContentHandler extends AbstractHandler<ContentModel, ContentEntity> {
    constructor() {
        super(ContentRepository);
    }

    public async handleGenerateEmbeddings(text: string) {
        const chunks = await this.splitInChunks(text);
        const embeddingModel = await FlagEmbedding.init({
            model: EmbeddingModel.BGEBaseEN
        });

        const embeddings: number[] = []

        for await (const batch of embeddingModel.embed(chunks)) {
            embeddings.push(...batch[0]);
        }

        return embeddings;
    }

    private async splitInChunks(text: string): Promise<string[]> {
        const textSplitter = new CharacterTextSplitter({
            chunkSize: 256,
            chunkOverlap: 200
        }),
            chunks = await textSplitter.splitText(text);

        return chunks;
    }

    public async search(embedding: number[]) {
        return await this.repository.semanticSearch(embedding);
    }
}

export default ContentHandler;