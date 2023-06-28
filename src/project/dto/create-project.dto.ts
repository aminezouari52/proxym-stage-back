import { ApiProperty } from '@nestjs/swagger'
import { IsEnum } from 'class-validator'

enum Profiles {
  Engineer = 'Engineer',
  Masters = 'Masters',
  License = 'License',
}

export class CreateProjectDto {
  @ApiProperty()
  title: string

  @ApiProperty()
  description: string

  @ApiProperty()
  candidatesNumber: number

  @ApiProperty()
  adminName: string

  @IsEnum(Profiles, { each: true })
  @ApiProperty()
  requiredProfiles: Profiles[]

  @ApiProperty()
  technicalEnvironment: string[]

  @ApiProperty()
  sessionId: number
}
