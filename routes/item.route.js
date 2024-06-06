import { Router } from "express"
import { imageService } from "../service/image.service.js";
import itemMiddleware from "../middlewares/item.middleware.js";
import itemController from "../controllers/item.controller.js";

const itemRouter = Router();

itemRouter.post('/post', imageService.saveMultipleImg('items'), itemMiddleware.createItem, itemController.createItem)

export default itemRouter