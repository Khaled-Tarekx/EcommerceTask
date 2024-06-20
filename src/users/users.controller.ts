import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateAddressDTO, CreateUserDto } from './dto/index';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('/address')
  createAddress(@Body() CreateAddressDTO: CreateAddressDTO) {
    try {
      return this.usersService.createAddress(CreateAddressDTO)
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }

  @Get(':userId/orders')
  getUserOrders(@Param(':userId') userId: number) {
    return this.usersService.getUserOrders(userId);
  }
}

 
