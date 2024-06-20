import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-cart.dto';
import { IsDate } from 'class-validator';

export class UpdateCartDto extends PartialType(CreateCartDto) {
    @IsDate()
    updatedAt: Date;
}
