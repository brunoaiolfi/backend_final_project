import { EmbeddingModel, FlagEmbedding } from "fastembed";
import { CharacterTextSplitter } from "langchain/text_splitter";

export class LanguageModelProcessor {

    public static async splitInChunks(text: string): Promise<string[]> {
        const textSplitter: CharacterTextSplitter = new CharacterTextSplitter({
            chunkSize: 256,
            chunkOverlap: 200,
        });

        return await textSplitter.splitText(text);
    }

    public static async generateEmbedding(chunks: string[]) {
        const embeddingModel = await FlagEmbedding.init({
            model: EmbeddingModel.BGEBaseEN
        });

        const embeddings: number[] = []

        for await (const batch of embeddingModel.embed(chunks)) {
            embeddings.push(...batch[0]);
        }

        return embeddings;
    }
}