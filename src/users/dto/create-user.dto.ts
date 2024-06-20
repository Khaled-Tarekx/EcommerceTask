import { IsEnum, IsEmail, IsOptional, IsString, Length, IsNotEmpty } from 'class-validator';
import { UserRole, AddressType  } from '@prisma/client';


export class CreateAddressDTO {
  userId: number;
  streetAddress: string;
  apartmentAddress: string;
  country: string;
  zip: string;
  @IsEnum(AddressType)
  addressType: AddressType;
  default: boolean;
}

export class CreateUserDto {
        @IsString()
        @IsOptional()
        firstName?: string;

        @IsString()
        @IsOptional()
        lastName?: string;

        @IsEmail()
        @IsNotEmpty()
        email: string;

        @IsString()
        @Length(6, 25)
        @IsNotEmpty()
        password: string;
      
        @IsEnum(UserRole)
        @IsOptional()
        role?: UserRole;
}
      

