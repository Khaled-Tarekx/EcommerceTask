import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDTO, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateUserDto) {
    try{
      const user = await this.prisma.user.create({
        data: {
          ...data
        }, select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        }
     })
    return user;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {  // error code for dublication in properties for unique fields
          throw new ForbiddenException('credentials taken already')
        }
      }
    }
  
  }

  async createAddress(data: CreateAddressDTO) {
      const address = await this.prisma.address.create({
        data: {
         ...data
        }
     })
    return address;
    }


  async getUserOrders(userId: number) {
    const userOrders = await this.prisma.order.findMany({
      where: { userId: userId },
      include: { orderItems: true }
    })
    if (!userOrders) {
      throw new NotFoundException('userOrders not found')
    }
    return userOrders
    }
}
