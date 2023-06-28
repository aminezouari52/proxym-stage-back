import { ApiProperty } from '@nestjs/swagger'

export class UpdateApplicationDto {
  @ApiProperty()
  userId: number

  @ApiProperty()
  projectId: number

  @ApiProperty()
  status: any
}
