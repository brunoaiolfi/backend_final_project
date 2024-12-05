import { Router } from "express";
import ContentController from "../../controllers/content/ContentController";

const contentRoutes = Router();
const contentController = new ContentController();

contentRoutes.post("/", contentController.create);
contentRoutes.post("/search", contentController.search);
contentRoutes.get("/", contentController.getAll);
contentRoutes.delete("/:id", contentController.delete);


export default contentRoutes;