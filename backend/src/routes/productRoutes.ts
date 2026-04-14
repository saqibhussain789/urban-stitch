import { Router } from "express";
import { getProducts, getProductById, createProduct } from "../controllers/productController";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin Routes
router.post("/", createProduct);

export default router;
