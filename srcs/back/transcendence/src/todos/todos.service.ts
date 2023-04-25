import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
	// First array of users, will be replaced by our PostGre DB
	todos: Todo[] = [
		{
			id: 1,
			title: "blabla",
			description: "my descriptionionion",
			done: false
		},
		{
			id: 2,
			title: "blibli",
			description: "my description 2",
			done: true
		},
		{
			id: 3,
			title: "wine",
			description: "buy wine",
			done: true
		}
	];

	findAll(): Todo[] {
		return this.todos;
	}

	findOne(id: string) {
		return this.todos.find(todo => todo.id === Number(id)); 
	}

	create(todo: CreateTodoDto) {
		this.todos = [...this.todos, todo]
	}

	update(id: string, todo: Todo) {
		// retrieve todo to update
		const todoToUpdate = this.todos.find(todo => todo.id === Number(id));
		if (!todoToUpdate) {
			return new NotFoundException("didn't find user");
		}

		// apply modification to granularly update a single property
		if (todo.hasOwnProperty('done')) {
			todoToUpdate.done = todo.done;
		}
		if (todo.title) {
			todoToUpdate.title = todo.title;
		}
		if (todo.description) {
			todoToUpdate.description = todo.description;
		}
		// plutot checker l'id au debut?
		const updatedTodos = this.todos.map(todo => todo.id !== Number(id) ? todo : todoToUpdate)
	
		this.todos = [...updatedTodos];
		return { updatedTodo: 1, todo: todoToUpdate };
	}

	delete(id: string) {
		const nbOfTodosBeforeDelete = this.todos.length;
		this.todos = [...this.todos.filter(todo => todo.id !== Number(id))] //revoir filter + spread Op
		if(this.todos.length < nbOfTodosBeforeDelete) {
			return { deletedTodos: 1, nbTodos: this.todos.length };
		} else {
			return { deletedTodos: 0, nbTodos: this.todos.length };
		}
	}
}
