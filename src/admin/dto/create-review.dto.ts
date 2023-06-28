import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateReviewDto {
  @ApiProperty()
  @IsNotEmpty()
  userId: number

  @ApiProperty()
  @IsNotEmpty()
  adminId: number

  @ApiProperty()
  @IsNotEmpty()
  note: string

  @ApiProperty()
  @IsNotEmpty()
  score: number
}
