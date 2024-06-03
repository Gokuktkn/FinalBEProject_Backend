import { Router } from "express"
import { imageService } from "../service/image.service.js";
import itemMiddleware from "../middlewares/item.middleware.js";
import itemController from "../controllers/item.controller.js";

const postItem = Router();

postItem.post('/post', imageService.saveMultipleImg('images'), itemMiddleware.createItem, itemController.createItem)

export { postItem }