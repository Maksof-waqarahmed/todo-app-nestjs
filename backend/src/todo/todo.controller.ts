import {
  Body,
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAllTodos() {
    try {
      const todos = await this.todoService.getAllTodos();
      return { success: true, data: todos, status: 200 };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getTodobyID(@Param('id') id: string) {
    try {
      await this.getTodobyID(id);
      return { message: 'fetched Successfully', status: 200 };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async createTODO(@Body() todo: CreateTodoDto) {
    try {
      await this.todoService.createTODO(todo);
      return { message: 'Created Successfully', status: 201 };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch()
  async updateTODO(@Body() todo: UpdateTodoDto) {
    try {
      await this.todoService.updateTodo(todo);
      return { message: 'Updated Successfully', status: 201 };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id') //lazmi h ye agr koi be chz params me sy a rhe h
  async deleteTODO(@Param('id') id: string) {
    try {
      await this.todoService.deleteTodo(id);
      return { message: 'Updated Successfully', status: 200 };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
