let template;

const createNewTodoNode = () => {
  if (!template) {
    template = document.getElementById('todo-item');
  }

  return template.content.firstElementChild.cloneNode(true);
}

const getTodoElement = (todo, index) => {
  const { text, completed } = todo;

  const element = createNewTodoNode();

  element.querySelector('input.edit').value = text;
  element.querySelector('label').textContent = text;

  if (completed) {
    element.classList.add('completed');
    element.querySelector('input.toggle').checked = true;
  }

  element.querySelector('button.destroy').dataset.index = index;

  return element;
};

export default (targetElement, { todos }, { deleteItem}) => {
  const newTodos = targetElement.cloneNode(true);

  newTodos.innerHTML = '';

  todos.map((todo, index) => getTodoElement(todo, index)).forEach(element => {
    newTodos.appendChild(element);
  });

  newTodos.addEventListener('click', e => {
    if(e.target.matches('button.destroy')){
      deleteItem(e.target.dataset.index);
    }
  })

  return newTodos;
}