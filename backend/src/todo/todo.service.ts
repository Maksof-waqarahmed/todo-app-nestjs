import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllTodos() {
    try {
      return await this.prisma.todo.findMany({
        where: { isDeleted: false },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching todos');
    }
  }

  async getTodobyID(id: string) {
    try {
      return await this.prisma.todo.findFirst({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching todo');
    }
  }

  async createTODO(todoData: CreateTodoDto) {
    try {
      return await this.prisma.todo.create({
        data: {
          title: todoData.title,
          todoName: todoData.todoName,
          userID: '',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error creating todo');
    }
  }

  async updateTodo(todoData: UpdateTodoDto) {
    try {
      const isFound = await this.prisma.todo.findFirst({
        where: { id: todoData.id },
      });

      if (!isFound) {
        throw new InternalServerErrorException('Todo not found');
      }

      await this.prisma.todo.update({
        where: { id: todoData.id },
        data: {
          title: todoData.title,
          todoName: todoData.todoName,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error updating todo');
    }
  }

  async deleteTodo(id: string) {
    try {
      const isFound = await this.prisma.todo.findFirst({
        where: { id: id, isDeleted: false },
      });

      if (!isFound) {
        throw new InternalServerErrorException('Todo not found');
      }

      return await this.prisma.todo.update({
        where: { id },
        data: {
          isDeleted: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error deleting todo');
    }
  }
}
