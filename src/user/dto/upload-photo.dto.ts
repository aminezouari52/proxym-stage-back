import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class UploadPhotoDto {
  @ApiProperty()
  @IsNotEmpty()
  userId: number
  @ApiProperty()
  @IsNotEmpty()
  photo: string
}
