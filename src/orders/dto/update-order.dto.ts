import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDTO } from './create-order.dto';
import { IsDate } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDTO) {
    @IsDate()
    updatedAt: Date;
}

