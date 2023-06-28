import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly firstName: string
  @ApiProperty()
  @IsNotEmpty()
  readonly lastName: string
  @ApiProperty()
  @IsNotEmpty()
  readonly email: string
  @ApiProperty()
  @IsNotEmpty()
  readonly password: string
}
