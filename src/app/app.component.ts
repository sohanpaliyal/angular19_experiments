import { Component, computed, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo/todo.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, TodoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  counter = signal(0);
  doubleValue = computed(() => this.counter() * 2);
  person = signal({ name: 'Alice', age: 25 });
  items = signal<string[]>(['Item 1', 'Item 2']);
  isVisible = signal(true);

  toggleVisibility() {
    this.isVisible.update(visible => !visible);
  }

  constructor() {
    effect(() => {
      console.log('Counter changed:', this.counter());
      // this.person.mutate(value => {
      //   value.age += 1;
      // });
    });

  }


  incrementAge() {
    this.person.update(current => ({
      ...current,
      age: current.age + 1,
    }));
  }

  ngOnInit() {
  }
  increment() {
    console.log('called')
    this.counter.update(value => value + 1);
    this.counter.set(10);
    this.incrementAge()
  }

  decrement() {
    this.counter.update(value => value - 1);
  }

  addItem() {
    this.items.update(currentItems => [...currentItems, `Item ${currentItems.length + 1}`]);
  }

}
