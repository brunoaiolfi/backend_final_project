export class ContentDTO {
    id?: number;
    text: string = "";
    embedding?: number[] = [];

    constructor(id: number, text: string, embedding: number[] = []) {
        this.id = id;
        this.text = text;
        this.embedding = embedding;
    }

}
