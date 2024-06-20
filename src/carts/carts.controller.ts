import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import {
  AddToCartDto,
  CreateCartDto,
  CreateCartItemDto,
  RemoveFromCartDto,
  UpdateCartQuantityDto,
} from './dto/create-cart.dto';

@Controller('api/cart')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    try {
      return this.cartsService.create(createCartDto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post('/add')
  addToCart(@Body() addToCartDto: AddToCartDto) {
    try {
      return this.cartsService.addToCart(addToCartDto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post('/item')
  createCartItem(@Body() createCartItemDto: CreateCartItemDto) {
    try {
      return this.cartsService.createCartItem(createCartItemDto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get(':userId')
  viewUserCart(
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    try {
      return this.cartsService.viewCart(userId);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Patch('update')
  updateCartItemQuantity(
    @Body() updateCartQuantityDto: UpdateCartQuantityDto,
  ) {
    try {
      return this.cartsService.updateCartItemQuantity(updateCartQuantityDto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Delete('remove')
  removeFromCart(@Body() removeFromCartDto: RemoveFromCartDto) {
    try {
      return this.cartsService.removeFromCart(removeFromCartDto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
