import { Controller, Get, Post, Body,  Param,  ParseIntPipe, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateAddressDTO, CreateUserDto } from './dto/index';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId/orders')
  async getUserOrders(@Param('userId', ParseIntPipe) userId: number) {
    return await this.usersService.getUserOrders(userId);
  }

  
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Post('/address')
  async createAddress(@Body() CreateAddressDTO: CreateAddressDTO) {
    try {
      return await this.usersService.createAddress(CreateAddressDTO)
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }


}

 
