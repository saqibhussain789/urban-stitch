import { Router } from "express";
import { createOrder, getOrders } from "../controllers/orderController";

const router = Router();

router.post("/", createOrder);
// Admin Route
router.get("/", getOrders);

export default router;
