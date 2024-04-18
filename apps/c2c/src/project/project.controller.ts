import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CONTROLLERS, JOBS } from '@c2c-extensions/constants';
import { CreateProjectDto, UpdateProjectDto } from '@c2c-extensions/dtos';
import { ProjectService } from './project.service';

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @MessagePattern({ cmd: CONTROLLERS.PROJECT.CREATE })
  create(@Payload() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @MessagePattern({ cmd: CONTROLLERS.PROJECT.LIST })
  findAll() {
    return this.projectService.findAll();
  }

  @MessagePattern({ cmd: CONTROLLERS.PROJECT.LISTONE })
  findOne(@Payload() id: number) {
    return this.projectService.findOne(id);
  }

  @MessagePattern({ cmd: CONTROLLERS.PROJECT.UPDATE })
  update(@Payload() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(updateProjectDto.id, updateProjectDto);
  }

  @MessagePattern({ cmd: CONTROLLERS.PROJECT.REMOVE })
  remove(@Payload() id: number) {
    return this.projectService.remove(id);
  }

  @MessagePattern({
    cmd: JOBS.PROJECT.UPDATE_ADMIN,
    uuid: process.env.PROJECT_ID,
  })
  addAdmin(dto) {
    return this.projectService.addAdmin(dto);
  }
}
