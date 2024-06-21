import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  BadRequestException,
  ParseIntPipe,
  Put,
  UsePipes,
  ValidationPipe,

} from '@nestjs/common';
import { OrdersService } from './orders.service';
import {
  ApplyCouponDTO,
  CreateCouponDTO,
  CreateOrderDTO,
  CreateOrderItemDTO,
  UpdateOrderStatusDto,
} from './dto/index';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDTO) {
    try {
    return await this.ordersService.createOrder(
      createOrderDto,
    )} catch (err) {
      throw new BadRequestException(err.message);
    }
    
  }
  @Post('/item')
  async createOrderItem(@Body() createOrderItemDTO: CreateOrderItemDTO) {
    try {
      return await this.ordersService.createOrdeItem(createOrderItemDTO);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
  @Post('/coupon')
  async createCoupon(@Body() createCouponDTO: CreateCouponDTO) {
    try {
      return await this.ordersService.createCoupon(createCouponDTO);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get(':orderId')
  async getOrderByID(@Param('orderId', ParseIntPipe) orderId: number) {
    try {
      return await this.ordersService.getOrderById(orderId);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Put(':orderId/status')
  async updateOrderStatus(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    try {
      return await this.ordersService.updateOrderStatus(
        orderId,
        updateOrderStatusDto,
      );
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post('apply-coupon')
  async applyCoupon(@Body() applyCoupon: ApplyCouponDTO) {
    try {
      return await this.ordersService.applyCoupon(applyCoupon);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
