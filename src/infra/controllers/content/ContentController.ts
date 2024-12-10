import { Request, Response } from "express";
import ContentHandler from "../../../application/useCases/handlers/content/ContentHandler";
import { ContentDTO } from "../../dtos/content";
import ContentCommand from "../../../application/useCases/command/content/ContentCommand";

class ContentController {
    private contentHandler = new ContentHandler()

    public create = async (req: Request, res: Response) => {
        try {
            const dto = req.body as ContentDTO;

            if (!ContentCommand.validateText(dto.text)) {
                res.send("Please review your content, The min length is 12 characters!");
                return;
            }

            const embedding = await this.contentHandler.handleGenerateEmbeddings(dto.text);
            const response = await this.contentHandler.create({ ...dto, embedding });
            const embedding = await this.contentHandler.handleGenerateEmbeddings(dto.text);
            const response = await this.contentHandler.create({ ...dto, embedding });

            res.status(201).json({ response });
            return;
        } catch (error: any) {
            res.send(error.message);
        }
    }

    public search = async (req: Request, res: Response) => {
        try {
            const dto = req.body as ContentDTO;

            if (!ContentCommand.validateText(dto.text)) {
                res.send("Please review your content, The min length is 12 characters!");
                return;
            }

            const embedding = await this.contentHandler.handleGenerateEmbeddings(dto.text);

            const semanticSearch = await this.contentHandler.searchByEmbeddings(embedding)

            if (!semanticSearch) {
                res.status(404).send("No contents found");
                return;
            }

            res.json(semanticSearch);
        } catch (error: any) {
            res.send(error.message);
        }
    }

    public getAll = async (req: Request, res: Response) => {
        try {
            const contents = await this.contentHandler.getAll();

            if (!contents) {
                res.status(404).send("No contents found");
                return;
            }

            const response = contents.map(c => {
                const content = new ContentDTO(c.id, c.text, c.embedding);
                const content = new ContentDTO(c.id, c.text, c.embedding);
                return content;
            });

            res.json(response);
        } catch (error: any) {
            res.send(error.message);
        }
    }

    public delete = async (req: Request, res: Response) => {
        const contentId = parseInt(req.params.id);

        try {
            if (!await ContentCommand.contentExists(contentId)) {
                res.status(404).send("Content not found");
                return;
            }


            await this.contentHandler.delete(contentId);

            res.status(200).send("Content deleted");
            return;
        } catch (error: any) {
            res.send(error.message);
        }
    }
}

export default ContentController;