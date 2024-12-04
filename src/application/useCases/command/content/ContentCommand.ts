import ContentRepository from "../../../repositories/content/ContentRepository";

class ContentCommand {
    private static repository = new ContentRepository();

    public static validateText(text: string): boolean {
        return text.length >= 12;
    }

    public static contentExists = async (id: number) => {
        return !!(await this.repository.getBy("id", id));
    }
}

export default ContentCommand;