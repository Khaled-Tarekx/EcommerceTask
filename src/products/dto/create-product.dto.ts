import { IsNumber, MinLength } from "class-validator";

export class CreateProductDto {
        name: string;
        @MinLength(20)
        description?: string;
        @IsNumber()
        price: number;
        @IsNumber()
        discountPrice?: number;
        stock: number;
        createdAt: Date;
}
