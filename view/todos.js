const getTodoElement = (todo) => {
    const { text, completed } = todo;

    return `
      <li ${completed ? 'class="completed"' : ''}>
        <div class="view">
          <input ${completed ? "checked" : ""}
            class="toggle" type="checkbox">
          <label>${text}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${text}">
      </li>
    `;
};

export default (targetElement, { todos }) => {
    const newTodos = targetElement.cloneNode(true);

    const todoElements = todos.map(getTodoElement).join("");

    newTodos.innerHTML = todoElements;

    return newTodos;
}