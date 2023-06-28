import { ApiProperty } from '@nestjs/swagger'

export class ContactInfoDto {
  @ApiProperty()
  firstName: string

  @ApiProperty()
  lastName: string

  @ApiProperty()
  email: string

  @ApiProperty()
  photo: string

  @ApiProperty()
  phone: string

  @ApiProperty()
  birthDate: string

  @ApiProperty()
  nationalID: string
}

export class ExperienceDto {
  @ApiProperty()
  title: string

  @ApiProperty()
  description: string

  @ApiProperty()
  duration: string
}

export class CareerInfoDto {
  @ApiProperty()
  CV: string

  @ApiProperty({ type: [String] })
  skills: string[]

  @ApiProperty({ type: [ExperienceDto] })
  experience: ExperienceDto[]
}

export class ProjectsDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  title: string
}

export class SubmitApplicationDto {
  @ApiProperty({ type: ContactInfoDto })
  contactInfo: ContactInfoDto

  @ApiProperty({ type: CareerInfoDto })
  careerInfo: CareerInfoDto

  @ApiProperty({ type: [ProjectsDto] })
  projects: ProjectsDto[]

  @ApiProperty({ type: [String] })
  usefulLinks: string[]
}
