import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class UploadCVDto {
  @ApiProperty()
  @IsNotEmpty()
  userId: number
  @ApiProperty()
  @IsNotEmpty()
  CV: string
}
