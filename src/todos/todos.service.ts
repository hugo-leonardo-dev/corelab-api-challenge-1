import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTodoDto) {
    return this.prisma.todo.create({ data });
  }

  // async findAll(params: {
  //   favorite?: boolean;
  //   color?: string;
  //   search?: string;
  // }) {
  //   const { favorite, color, search } = params;
  //   const where: any = {};
  //   if (typeof favorite === 'boolean') where.isFavorite = favorite;
  //   if (color) where.color = color;
  //   if (search) where.title = { contains: search, mode: 'insensitive' };

  //   return this.prisma.todo.findMany({
  //     where,
  //     orderBy: [{ isFavorite: 'desc' }, { updatedAt: 'desc' }],
  //   });
  // }

  // async findOne(id: string) {
  //   const todo = await this.prisma.todo.findUnique({ where: { id } });
  //   if (!todo) throw new NotFoundException('Todo not found');
  //   return todo;
  // }

  async update(id: string, data: UpdateTodoDto) {
    try {
      return await this.prisma.todo.update({ where: { id }, data });
    } catch {
      throw new NotFoundException('Todo not found');
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.todo.delete({ where: { id } });
      return { success: true };
    } catch {
      throw new NotFoundException('Todo not found');
    }
  }

  async removeByUser(userId: string) {
    await this.prisma.todo.deleteMany({ where: { userId } });
    return { success: true };
  }

  async findByUser(userId: string) {
    return this.prisma.todo.findMany({ where: { userId } });
  }
}
