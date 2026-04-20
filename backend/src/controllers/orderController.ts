import { Request, Response } from "express";
import prisma from "../config/db";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { items, fullName, phone, address, city } = req.body;

    // Validate request
    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Order items cannot be empty" });
    }

    // 1. Calculate total independently from DB to prevent client manipulation
    let totalAmount = 0;
    const orderItemsData: { productVariantId: string; quantity: number; price: number }[] = [];

    // Begin interactive transaction for safety
    const order = await prisma.$transaction(async (tx) => {
        
        for (const item of items) {
            // Find variant
            const variant = await tx.productVariant.findUnique({
                where: { id: item.productVariantId },
                include: { product: true }
            });

            if (!variant) {
                throw new Error(`Variant ${item.productVariantId} not found`);
            }

            if (variant.stock < item.quantity) {
                throw new Error(`Insufficient stock for ${variant.product.title} (${variant.size})`);
            }

            // Decrement stock
            await tx.productVariant.update({
                where: { id: variant.id },
                data: { stock: variant.stock - item.quantity }
            });

            const priceSnapshot = variant.product.price;
            totalAmount += priceSnapshot * item.quantity;

            orderItemsData.push({
                productVariantId: variant.id,
                quantity: item.quantity,
                price: priceSnapshot
            });
        }

        // 2. Create the Address
        const deliveryAddress = await tx.address.create({
            data: {
                fullName,
                phone,
                address,
                city
            }
        });

        // 3. Create Order
        const newOrder = await tx.order.create({
            data: {
                trackingId: `BF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
                totalAmount,
                addressId: deliveryAddress.id,
                status: "PENDING",
                orderItems: {
                    create: orderItemsData
                }
            },
            include: {
                orderItems: true,
                address: true
            }
        });

        return newOrder;
    });

    res.status(201).json(order);

  } catch (error: any) {
    console.error("Order creation failed:", error);
    res.status(400).json({ error: error.message || "Failed to create order" });
  }
};

export const getOrderByTrackingId = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const order = await prisma.order.findUnique({
      where: { trackingId: id },
      include: {
        address: true,
        orderItems: {
          include: {
            productVariant: {
              include: {
                product: true
              }
            }
          }
        }
      }
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Error fetching order by tracking id:", error);
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        address: true,
        orderItems: {
          include: {
            productVariant: {
              include: {
                product: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { status } = req.body; // PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED

    const order = await prisma.order.update({
      where: { id },
      data: { status },
      include: {
        address: true,
        orderItems: true
      }
    });

    res.json(order);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Failed to update order status" });
  }
};

