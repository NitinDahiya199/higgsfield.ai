import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { ProjectsService } from "./projects.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";

@Controller("api/projects")
@UseGuards(AuthGuard("jwt"))
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Req() req: Request, @Body() createProjectDto: CreateProjectDto) {
    const userId = (req.user as any)?.userId;
    return this.projectsService.create(userId, createProjectDto);
  }

  @Get()
  findAll(@Req() req: Request, @Query("organizationId") organizationId?: string) {
    const userId = (req.user as any)?.userId;
    return this.projectsService.findAll(userId, organizationId);
  }

  @Get(":id")
  findOne(@Param("id") id: string, @Req() req: Request) {
    const userId = (req.user as any)?.userId;
    return this.projectsService.findOne(id, userId);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Req() req: Request, @Body() updateProjectDto: UpdateProjectDto) {
    const userId = (req.user as any)?.userId;
    return this.projectsService.update(id, userId, updateProjectDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string, @Req() req: Request) {
    const userId = (req.user as any)?.userId;
    return this.projectsService.remove(id, userId);
  }
}
