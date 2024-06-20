import { OrderItem, OrderStatus } from '@prisma/client';
import { IsEnum, IsInt, IsNumber, IsOptional, Length } from 'class-validator';

export class CreateOrderDTO {
    @IsInt()
    userId: number;

    @IsEnum(OrderStatus)
    status: OrderStatus;
    
    @IsOptional()
    @IsInt()
    couponId?: number
}

export class CreateOrderItemDTO {
    @IsInt()
    orderId: number;
    @IsInt()
    productId: number;
    @IsNumber()
    quantity: number;
}

export class CreateCouponDTO {
    @Length(6, 20)
    code:   string
    @IsNumber()
    amount: number
}

export class UpdateOrderStatusDto {
    @IsEnum(OrderStatus)
    status: OrderStatus;
  }

  export class ApplyCouponDTO {
    @IsInt()
    orderId: number
    @IsInt()
    couponId: number
}