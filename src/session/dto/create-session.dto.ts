import { ApiProperty } from '@nestjs/swagger'

export class CreateSessionDto {
  @ApiProperty()
  title: string

  @ApiProperty()
  active: boolean

  @ApiProperty()
  startDate: Date

  @ApiProperty()
  endDate: Date

  @ApiProperty()
  deadlineDate: Date

  @ApiProperty()
  description: string

  @ApiProperty()
  maxCandidates: number
}
