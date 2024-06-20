import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsDate } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsDate()
    updatedAt: Date;
}
