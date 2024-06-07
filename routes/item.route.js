import { Router } from "express"
import { imageService } from "../service/image.service.js";
import itemMiddleware from "../middlewares/item.middleware.js";
import itemController from "../controllers/item.controller.js";

const itemRouter = Router();

// TODO: FINISH ALL OF THIS TODAY

itemRouter.get('/get-all', itemController.getAllItems) // done
itemRouter.get('/get-type/:type', itemController.getItemType) // done
itemRouter.get('/get-item', itemController.getItem) // done
itemRouter.post('/create', imageService.saveMultipleImg('items'), itemMiddleware.createItem, itemController.createItem) //done
itemRouter.put('/update/:name') // pending
itemRouter.delete('/delete/:name') // pending

export default itemRouter