import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateInterviewDto {
  @ApiProperty()
  @IsNotEmpty()
  userId: number

  @ApiProperty()
  @IsNotEmpty()
  date: string

  @ApiProperty()
  @IsNotEmpty()
  time: string

  @ApiProperty()
  supervisors: string
}
