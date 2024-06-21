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
  async create(@Body() createCartDto: CreateCartDto) {
    try {
      return await this.cartsService.create(createCartDto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post('/add')
  async addToCart(@Body() addToCartDto: AddToCartDto) {
    try {
      return await this.cartsService.addToCart(addToCartDto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post('/item')
  async createCartItem(@Body() createCartItemDto: CreateCartItemDto) {
    try {
      return await this.cartsService.createCartItem(createCartItemDto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get(':userId')
  async viewUserCart(
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    try {
      return await this.cartsService.viewCart(userId);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Patch('update')
  async updateCartItemQuantity(
    @Body() updateCartQuantityDto: UpdateCartQuantityDto,
  ) {
    try {
      return await this.cartsService.updateCartItemQuantity(updateCartQuantityDto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Delete('remove')
  async removeFromCart(@Body() removeFromCartDto: RemoveFromCartDto) {
    try {
      return await this.cartsService.removeFromCart(removeFromCartDto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
