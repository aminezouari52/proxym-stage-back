import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ProjectService } from './project.service'
import { ApiParam, ApiTags } from '@nestjs/swagger'
import { Project } from '@prisma/client'
import { CreateProjectDto } from './dto/create-project.dto'

@ApiTags('projects')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('projects')
  async getAllProjects(): Promise<Project[]> {
    return await this.projectService.findAll()
  }

  @ApiParam({ name: 'id', description: 'The ID of the project', type: Number })
  @Get(':id')
  async findOneById(@Param('id') id: number) {
    const project = await this.projectService.findOneById(id)
    return { project }
  }

  @Post('create')
  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto)
  }

  // CREATE PROJECT
}
