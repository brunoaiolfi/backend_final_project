import AbstractRepository from "../AbstractRepository";

class ContentRepository extends AbstractRepository<ContentRepository>{
    constructor() {
        super("content");
    }

    public async searchByEmbeddings(embedding: number[], trashold = 0.78, limit = 1) {
        await this.unsafeQuery('CREATE EXTENSION IF NOT EXISTS vector;')
        const res = await this.unsafeQuery(`
            SELECT
                "text",
                1 - ("embedding"::vector <=> '[${embedding.toString()}]'::vector) AS similarity
            FROM
                "content"
            WHERE
                1 - ("embedding"::vector <=> '[${embedding.toString()}]'::vector) > ${trashold}
            ORDER BY
                similarity DESC
            LIMIT
                ${limit}
        `);
        return res;
    }
}

export default ContentRepository;