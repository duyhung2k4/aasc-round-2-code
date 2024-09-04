import { Router } from "express";
import { requisiteController } from "../controllers/requisite";

const requisiteRouter = Router();

requisiteRouter.get("/list", requisiteController.listRequisite);
requisiteRouter.post("/add", requisiteController.addRequisite);
requisiteRouter.put("/update", requisiteController.updateRequisite);
requisiteRouter.delete("/delete", requisiteController.deleteRequisite);

export default requisiteRouter;