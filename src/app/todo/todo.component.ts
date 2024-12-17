import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo',
  imports: [FormsModule, CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})

export class TodoComponent {

  todos = signal<Todo[]>([]);
  newTask = signal<string>('');

  trackById(index: number, todo: Todo): number {
    return todo.id;
  }

  addTask() {
    if (this.newTask().trim()) {
      this.todos.update(current => [
        ...current,
        { id: Date.now(), task: this.newTask(), completed: false },
      ]);
      this.newTask.set('');
    }
  }

  removeTask(id: number) {
    this.todos.update(current => current.filter(todo => todo.id !== id));
  }

  toggleTask(id: number) {
    this.todos.update(current =>
      current.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }
}
