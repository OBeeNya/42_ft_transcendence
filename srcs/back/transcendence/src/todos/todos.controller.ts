import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './interfaces/todo.interface';
import { CreateTodoDto } from './dto/create-todo.dto';
// import { Controller, Get } from 'src/';

// localhost:3000:todos
@Controller('todos')
export class TodosController {
	constructor(private readonly todosService: TodosService ) {}

	@Get()
	findAll(): Todo[] {
		return this.todosService.findAll();
	}

	// localhost:3000/todos/:id
	@Get(':id')
	findOne(@Param('id') id: string) {
		console.log("id", id);
		return this.todosService.findOne(id); 
	}

	@Post()
	createTodo(@Body() newTodo: CreateTodoDto) {
		console.log("newTodo", newTodo); 
		this.todosService.create(newTodo);
	}

	// localhost:3000/todos/:id
	@Patch(':id')
	updateTodo(@Param('id') id: string, @Body() todo: CreateTodoDto ) {
		return this.todosService.update(id, todo);
	}

	@Delete(':id')
	deleteTodo(@Param('id') id: string) {
		return this.todosService.delete(id);
	}
}
