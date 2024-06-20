import { IsInt, IsNumber } from "class-validator";



export class CreateCartItemDto {
    @IsInt()
    cartId: number;
    @IsInt()
    productId: number;
    @IsNumber()
    quantity: number;
  }

export class CreateCartDto {
    @IsInt()
    userId: number;
}

export class AddToCartDto {
  @IsInt()
  userId: number;
  @IsInt()
  productId: number;
  @IsNumber()
  quantity: number;
}

export class RemoveFromCartDto {
  @IsInt()
  userId: number;

  @IsInt()
  id: number;
}

export class UpdateCartQuantityDto {
  @IsInt()
  id: number;
  @IsNumber()
  quantity: number;
}