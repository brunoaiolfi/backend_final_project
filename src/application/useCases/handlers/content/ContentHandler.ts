import ContentEntity from "../../../../domain/entities/content/ContentEntity";
import ContentModel from "../../../models/ContentModel";
import ContentRepository from "../../../repositories/content/ContentRepository";
import AbstractHandler from "../AbstractHandler";

class ContentHandler extends AbstractHandler<ContentModel, ContentEntity> {
    constructor() {
        super(ContentRepository);
    }
}

export default ContentHandler;