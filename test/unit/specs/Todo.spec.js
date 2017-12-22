import Vue from 'vue'
import Todo from '@/components/Todo'

beforeEach(() => {
  const Constructor = Vue.extend(Todo)
  const vm = new Constructor().$mount()
  vm.todos = []
  vm.newTodo = ''
  vm.editedTodo = null
  vm.visibility = 'all'
})

describe('Todo.vue', () => {
  it('Deve renderizar o componente corretamente', () => {
    const Constructor = Vue.extend(Todo)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('header.header h1').textContent)
    .toEqual('TODO')
  })
  it('Deve inserir um item na lista de todo', () => {
    const Constructor = Vue.extend(Todo)
    const vm = new Constructor().$mount()
    vm.newTodo = 'teste'
    vm.addTodo()
    expect(vm.todos.length)
    .toEqual(1)
  })
  it('Não deve inserir um item vazio na lista de todo', () => {
    const Constructor = Vue.extend(Todo)
    const vm = new Constructor().$mount()
    vm.newTodo = ''
    vm.addTodo()
    expect(vm.todos.length)
    .toEqual(0)
  })
  it('Deve alterar um item da lista', () => {
    const Constructor = Vue.extend(Todo)
    const vm = new Constructor().$mount()
    const itemInitialContent = 'teste'
    const itemChanged = 'testeC'
    vm.newTodo = itemInitialContent
    vm.addTodo()
    const todo = vm.todos[0]
    vm.editTodo(todo)
    todo.title = itemChanged
    vm.doneEdit(todo)
    expect(vm.todos[0].title)
    .toEqual(itemChanged)
  })
  it('Deve não fazer nada se o editedTodo não tiver setado', () => {
    const Constructor = Vue.extend(Todo)
    const vm = new Constructor().$mount()
    const itemInitialContent = 'teste'
    vm.newTodo = itemInitialContent
    vm.addTodo()
    const todo = vm.todos[0]
    vm.doneEdit(todo)
    expect(vm.todos[0].title)
    .toEqual(itemInitialContent)
  })
  it('Deve excluir um item da lista, caso seja alterado para string vazia', () => {
    const Constructor = Vue.extend(Todo)
    const vm = new Constructor().$mount()
    const itemInitialContent = 'teste'
    const itemChanged = ''
    vm.newTodo = itemInitialContent
    vm.addTodo()
    const todo = vm.todos[0]
    vm.editTodo(todo)
    todo.title = itemChanged
    vm.doneEdit(todo)
    expect(vm.todos.length)
    .toEqual(0)
  })
  it('Deve cancelar a alteração de um item da lista', () => {
    const Constructor = Vue.extend(Todo)
    const vm = new Constructor().$mount()
    const itemInitialContent = 'teste'
    const itemChanged = 'testeC'
    vm.newTodo = itemInitialContent
    vm.addTodo()
    const todo = vm.todos[0]
    vm.editTodo(todo)
    todo.title = itemChanged
    vm.cancelEdit(todo)
    expect(vm.todos[0].title)
    .toEqual(itemInitialContent)
  })
  it('Deve excluir um item da lista', () => {
    const Constructor = Vue.extend(Todo)
    const vm = new Constructor().$mount()
    const itemInitialContent = 'teste'
    vm.newTodo = itemInitialContent
    vm.addTodo()
    const todo = vm.todos[0]
    vm.removeTodo(todo)
    expect(vm.todos.length)
    .toEqual(0)
  })
  it('exibe na lista apenas os items completed', () => {
    const Constructor = Vue.extend(Todo)
    const vm = new Constructor().$mount()
    vm.newTodo = 'teste1'
    vm.addTodo()
    vm.newTodo = 'teste2'
    vm.addTodo()
    vm.newTodo = 'teste3'
    vm.addTodo()
    const todo = vm.todos[1]
    todo.completed = true
    vm.filterList('completed')
    expect(vm.filteredTodos.length)
    .toEqual(1)
  })
  it('remove apenas os items completed', () => {
    const Constructor = Vue.extend(Todo)
    const vm = new Constructor().$mount()
    vm.newTodo = 'teste1'
    vm.addTodo()
    vm.newTodo = 'teste2'
    vm.addTodo()
    vm.newTodo = 'teste3'
    vm.addTodo()
    const todo = vm.todos[1]
    todo.completed = true
    vm.removeCompleted()
    expect(vm.todos.length)
    .toEqual(2)
  })
  it('marca todos os item como done', () => {
    const Constructor = Vue.extend(Todo)
    const vm = new Constructor().$mount()
    vm.newTodo = 'teste1'
    vm.addTodo()
    vm.newTodo = 'teste2'
    vm.addTodo()
    vm.newTodo = 'teste3'
    vm.addTodo()
    let allDone = true
    vm.allDone = true
    vm.todos.forEach(function (todo) {
      if (!todo.completed) {
        allDone = false
      }
    })
    vm.filterList('completed')
    expect(allDone)
    .toBeTruthy()
  })
})
