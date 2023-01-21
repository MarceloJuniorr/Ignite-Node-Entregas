import { Router } from "express";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { AuthenticateClientController } from "./modules/acount/authenticateClient/AuthenticateClientController"
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";
import { AuthenticateDeliverymanController } from "./modules/acount/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateDeliveriesController } from "./modules/deliveries/useCases/createDeliveries/CreateDeliveriesController";
import { ensureAuthenticateCLient } from "./middleweres/ensureAuthenticateClient";

const routes = Router();

const createClientController = new CreateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const createDeliveriesController = new CreateDeliveriesController();


routes.post("/client",ensureAuthenticateCLient ,createClientController.handle)
routes.post("/authenticate/client", authenticateClientController.handle)
routes.post("/authenticate/deliveryman", authenticateDeliverymanController.handle)
routes.post("/deliveryman", createDeliverymanController.handle)
routes.post("/deliveries", ensureAuthenticateCLient , createDeliveriesController.handle)


export { routes };