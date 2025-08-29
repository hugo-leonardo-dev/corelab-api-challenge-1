import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() dto: CreateTodoDto) {
    return this.todosService.create(dto);
  }

  // @Get()
  // findAll(
  //   @Query('favorite') favorite?: string,
  //   @Query('color') color?: string,
  //   @Query('search') search?: string,
  // ) {
  //   return this.todosService.findAll({
  //     favorite:
  //       favorite === 'true' ? true : favorite === 'false' ? false : undefined,
  //     color,
  //     search,
  //   });
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.todosService.findOne(id);
  // }

  @Get('/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.todosService.findByUser(userId);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() dto: UpdateTodoDto) {
    return this.todosService.update(id, dto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(id);
  }
}
