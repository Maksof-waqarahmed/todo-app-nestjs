import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllTodos() {
    try {
      return await this.prisma.todo.findMany({
        select: {
          title: true,
          completed: true,
          isDeleted: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching todos');
    }
  }

  async createTODO(todoData: CreateTodoDto) {
    try {
      return await this.prisma.todo.create({
        data: {
          title: todoData.todo,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error creating todo');
    }
  }
}
