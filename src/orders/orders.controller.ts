import { Controller, Get, Post, Body, Param, BadRequestException, ParseIntPipe, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApplyCouponDTO, CreateCouponDTO, CreateOrderDTO, CreateOrderItemDTO, UpdateOrderStatusDto } from './dto/index';


@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDTO) {
    try{
      return this.ordersService.create(createOrderDto);
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }
  @Post('/item')
  createOrderItem(@Body() createOrderItemDTO: CreateOrderItemDTO) {
    try{
    return this.ordersService.createOrdeItem(createOrderItemDTO);
  } catch (err) {
    throw new BadRequestException(err.message)
    }
  }
  @Post('/coupon')
  createCoupon(@Body() createCouponDTO: CreateCouponDTO) {
    try{
    return this.ordersService.createCoupon(createCouponDTO);
  } catch (err) {
    throw new BadRequestException(err.message)
  }
}

  @Get(':orderId')
  getOrderByID(@Param('orderId', ParseIntPipe) orderId: number) {
    try{
    return this.ordersService.getOrderById(orderId);
  } catch (err) {
    throw new BadRequestException(err.message)
  }
  }

  @Put(':orderId/status')
  updateOrderStatus(@Param('orderId', ParseIntPipe) orderId: number, @Body() updateOrderStatusDto: UpdateOrderStatusDto) {
    try{
      return this.ordersService.updateOrderStatus(orderId, updateOrderStatusDto);
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }

  @Post('apply-coupon')
  applyCoupon(@Body() applyCoupon: ApplyCouponDTO) {
    try {
    return this.ordersService.applyCoupon(applyCoupon);
  } catch (err) {
    throw new BadRequestException(err.message)
  }
  }

}