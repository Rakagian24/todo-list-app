class TodoApp {
    constructor() {
      this.todoInput = document.getElementById('todo-input');
      this.todoForm = document.getElementById('todo-form');
      this.todoList = document.getElementById('todo-list');
      this.todos = [];
  
      this.bindEvents();
    }
  
    bindEvents() {
      this.todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = this.todoInput.value.trim();
        if (task) {
          this.addTodo(task);
          this.todoInput.value = '';
        }
      });
  
      this.todoList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
          const id = e.target.dataset.id;
          this.deleteTodo(id);
        }
      });
    }
  
    async addTodo(task) {
      const todo = {
        id: Date.now().toString(),
        task,
      };
      this.todos.push(todo);
      await this.render();
    }
  
    async deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
      await this.render();
    }
  
    async render() {
      this.todoList.innerHTML = '';
      for (const todo of this.todos) {
        const li = document.createElement('li');
        li.className = 'bg-gray-200 rounded-lg px-4 py-2 flex justify-between items-center';
        li.innerHTML = `
          <span class="text-gray-800">${todo.task}</span>
          <button class="text-red-500 hover:text-red-700 delete-btn" data-id="${todo.id}">&times;</button>
        `;
        this.todoList.appendChild(li);
      }
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
  });
  