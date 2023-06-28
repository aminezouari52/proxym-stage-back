import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class ContactInfoDto {
  firstName: string
  lastName: string
  email: string
  image: string
  phone: string
  birthDate: string
  CIN: string
}

export class ExperienceDto {
  title: string
  description: string
  duration: string
}
