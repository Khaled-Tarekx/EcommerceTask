import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDTO, CreateCouponDTO, CreateOrderItemDTO, UpdateOrderStatusDto, ApplyCouponDTO } from './dto/index';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateOrderDTO) {
    const order = await this.prisma.order.create({
      data: {
       ...data
      }
   })
  return order;
  }
  


  async createOrdeItem(data: CreateOrderItemDTO) {
    const orderItem = await this.prisma.orderItem.create({
      data: {
       ...data
      }
   })
  return orderItem;
  }
  

  async createCoupon(data: CreateCouponDTO) {
    const coupon = await this.prisma.coupon.create({
      data: {
       ...data
      }
   })
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
        return total + (productPrice * item.quantity);
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
      include: { orderItems: true }
    })
    if (!order) {
      throw new NotFoundException('order not found')
    }
    return order
  }


  async updateOrderStatus(id: number, data: UpdateOrderStatusDto) {
    const order = await this.prisma.order.findUnique({
      where: { id: id },
      include: { orderItems: true }
    })
    if (!order) {
      throw new NotFoundException('order not found')
    }

    const updatedOrderStatus = await this.prisma.order.update({
      where: { id: id },
      data: { status: data.status }
    })
    return updatedOrderStatus
  }
}
