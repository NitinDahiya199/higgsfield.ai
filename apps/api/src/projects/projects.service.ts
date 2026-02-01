import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createProjectDto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        name: createProjectDto.name,
        thumbnail: createProjectDto.thumbnail,
        userId,
        organizationId: createProjectDto.organizationId,
      },
    });
  }

  async findAll(userId: string, organizationId?: string) {
    const where: any = {
      userId,
    };

    if (organizationId) {
      where.organizationId = organizationId;
    }

    return this.prisma.project.findMany({
      where,
      orderBy: {
        updatedAt: "desc",
      },
    });
  }

  async findOne(id: string, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        jobs: {
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        },
        assets: {
          orderBy: {
            createdAt: "desc",
          },
          take: 20,
        },
      },
    });

    if (!project) {
      throw new NotFoundException("Project not found");
    }

    if (project.userId !== userId) {
      throw new ForbiddenException("You don't have access to this project");
    }

    return project;
  }

  async update(id: string, userId: string, updateProjectDto: UpdateProjectDto) {
    // Check if project exists and user owns it
    const project = await this.findOne(id, userId);

    return this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
    });
  }

  async remove(id: string, userId: string) {
    // Check if project exists and user owns it
    await this.findOne(id, userId);

    return this.prisma.project.delete({
      where: { id },
    });
  }
}
