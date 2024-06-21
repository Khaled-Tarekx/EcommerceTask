import { OrderStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsInt, IsNumber, IsOptional, Length, ValidateNested } from 'class-validator';

export class CreateOrderDTO {
    @IsInt()
    userId: number;

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