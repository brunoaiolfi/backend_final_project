import AbstractRepository from "../AbstractRepository";

class ContentRepository extends AbstractRepository<ContentRepository>{
    constructor() {
        super("content");
    }
}

export default ContentRepository;