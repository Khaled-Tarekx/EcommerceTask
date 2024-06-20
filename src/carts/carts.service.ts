import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto, CreateCartItemDto, AddToCartDto, RemoveFromCartDto, UpdateCartQuantityDto } from './dto/index'
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateCartDto) {
    const cart = await this.prisma.cart.create({
      data: {
        ...data
      }
   })
  return cart;
  }

  async createCartItem(data: CreateCartItemDto) {
    {
      const cartItem = await this.prisma.cartItem.create({
        data: {
          ...data
        }
     })
    return cartItem;
    }
  }

  async addToCart(data: AddToCartDto) {
    const { userId, productId, quantity } = data;
    const cart = await this.prisma.cart.findFirst({
      where: { userId },
      include: { cartItems: true },
    })
    if (!cart) {
      // assign a new cart with the user id
      const newCart = await this.prisma.cart.create({
        data: {
          userId,
          cartItems: {
            create: {
              productId,
              quantity,
            },
          },
        },
        include: { cartItems: true },
      })
       // return the first item you find in the list equals to only one item since it just got created
      return newCart?.cartItems[0]
    }
   
    // check if the product was on the cart the user already
    const cartItem = cart?.cartItems.find(ele => ele.productId === productId)

    if (cartItem) {
      return this.prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity: cartItem.quantity + quantity}
      })
    }
    return this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: productId,
        quantity: quantity
      }
    })
  }

  async viewCart(userId: number) {
    const cart = await this.prisma.cart.findFirst({
      where: { userId: userId,
      },
      include: { cartItems: true },
    })
    if (!cart) {
      throw new NotFoundException({ msg: 'cart wasnt found' })
    }
    return cart
  }

  async updateCartItemQuantity(data: UpdateCartQuantityDto) {
    const { id, quantity } = data
    if (quantity < 0) {
      throw new BadRequestException('quantity cannot be negative');
    }
    
    const cart = await this.prisma.cartItem.findUnique({
      where: { id: id }
    })

    if (!cart) {
      throw new NotFoundException(`no cart found`)
    }
    
    const updatedCartItem = await this.prisma.cartItem.update({
      where: { id: id },
      data: { quantity }
    })
    return { data: updatedCartItem, message: 'CartItem quantity updated' };
  }

  async removeFromCart(data: RemoveFromCartDto) {
    const { userId, id } = data;

    const cartItem = await this.prisma.cartItem.findFirst({
      where: {
        id,
        cart: {
          userId,
        },
      },
    });

    if (!cartItem) {
      throw new NotFoundException('CartItem not found');
    }
    const deletedCartItem = await this.prisma.cartItem.delete({
      where: {
        id: cartItem.id,
      },
    });

    return { data: deletedCartItem, message: 'CartItem removed successfully' };
  }
}
