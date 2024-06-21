import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateCouponDTO,
  CreateOrderItemDTO,
  UpdateOrderStatusDto,
  ApplyCouponDTO,
  CreateOrderDTO,
} from './dto/index';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderItem } from './interfaces/order.interfaces';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async createOrder(data: CreateOrderDTO) {
    // get card of user data.userId
    const cart = await this.prisma.cart.findFirst({
      where: { userId: data.userId },
      include: { cartItems: true },
    });

    if (!cart) {
      throw new NotFoundException('cart not found')
    }

    const order = await this.prisma.order.create({
      data: { userId: data.userId, status: OrderStatus.PENDING },
    });
    const orderItems = await this.prisma.orderItem.createManyAndReturn({
      data: cart.cartItems.map((cartItem) => ({
        orderId: order.id,
        quantity: cartItem.quantity,
        productId: cartItem.productId,
      })),
    });

    const productIds = orderItems.map((item) => item.productId);

    const productPrices = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, price: true },
    });

    const totalAmount = orderItems.reduce((total, item) => {
      const product = productPrices.find((product) => product.id === item.productId);
      if (!product) {
        throw new NotFoundException(
          `Product with id ${item.productId} not found`,
        );
      }
      return total + product.price * item.quantity;
    }, 0);

  

    const items: OrderItem[] = await this.prisma.orderItem.createManyAndReturn({
      data: orderItems.map((item) => ({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
      })),
      include: {
        product: true,
      },
    });


    const createdOrder = await this.prisma.order.create({
      data: {
        userId: data.userId,
        totalAmount,
        orderItems: {
          connect: items,
        },
      },
    });
    

    return createdOrder;
  }

  async createOrdeItem(data: CreateOrderItemDTO) {
    const orderItem = await this.prisma.orderItem.create({
      data: {
        ...data,
      },
    });
    return orderItem;
  }

  async createCoupon(data: CreateCouponDTO) {
    const coupon = await this.prisma.coupon.create({
      data: {
        ...data,
      },
    });
    return coupon;
  }

  async applyCoupon(data: ApplyCouponDTO) {
    const { orderId, couponId } = data;

    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { orderItems: { include: { product: true } } },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const coupon = await this.prisma.coupon.findUnique({
      where: { id: couponId },
    });

    if (!coupon) {
      throw new NotFoundException('Coupon not found');
    }

    if (order.couponId === couponId) {
      throw new BadRequestException('Coupon already applied to this order');
    }

    let currentTotalAmount = 0;
    if (order.orderItems && order.orderItems.length > 0) {
      currentTotalAmount = order.orderItems.reduce((total, item) => {
        const productPrice = item.product.price;
        return total + productPrice * item.quantity;
      }, 0);
    }

    // Apply the coupon discount
    const discountedAmount = currentTotalAmount - coupon.amount;
    const finalTotalAmount = discountedAmount < 0 ? 0 : discountedAmount;

    const updatedOrder = await this.prisma.order.update({
      where: { id: orderId },
      data: {
        totalAmount: finalTotalAmount,
        couponId,
      },
    });

    return updatedOrder;
  }

  async getOrderById(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: id },
      include: { orderItems: true },
    });
    if (!order) {
      throw new NotFoundException('order not found');
    }
    return order;
  }

  async updateOrderStatus(id: number, data: UpdateOrderStatusDto) {
    const order = await this.prisma.order.findUnique({
      where: { id: id },
      include: { orderItems: true },
    });
    if (!order) {
      throw new NotFoundException('order not found');
    }

    const updatedOrderStatus = await this.prisma.order.update({
      where: { id: id },
      data: { status: data.status },
    });
    return updatedOrderStatus;
  }
}
