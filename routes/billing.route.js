import { Router } from "express"
import billingMiddleware from "../middlewares/billing.middleware.js";
import billingController from "../controllers/billing.controller.js";

const billingRoute = Router();

billingRoute.get('/unique:id', billingMiddleware.checkUnique, billingController.confirmUnique)
billingRoute.post('/request')

export default billingRoute