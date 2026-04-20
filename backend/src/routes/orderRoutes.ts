import { createOrder, getOrders, updateOrderStatus, getOrderByTrackingId } from "../controllers/orderController";
import { Router } from "express";

const router = Router();

router.post("/", createOrder);
router.get("/track/:id", getOrderByTrackingId);

// Admin Route
router.get("/", getOrders);
router.patch("/:id/status", updateOrderStatus);


export default router;
