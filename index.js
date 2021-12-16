let todos = [
    {
      id: 1,
      text: "Example",
      isComplited: false,
      date: new Date().toLocaleDateString(),
    },
  ];
  
  const root = document.querySelector("#root");
  const header = createHeader();
  const main = createTodoList(todos);
  
  header.addEventListener("click", (event) => onHeaderClick(event));
  
  root.append(header, main);
  
  const onHeaderClick = (event) => {
    if (event.target.id === "in") {
    } else if (event.target.id === "add") {
      const item = {
        id: todos.length + 1,
        text: event.target.previousElementSibling.value,
        isComplited: false,
        date: new Date().toLocaleDateString(),
      };
      todos.unshift(item);
      render(todos);
    } else if (event.target.id === "DA") {
      todos.length = 0;
      render(todos);
    } else if (event.target.id === "DL") {
      todos.pop();
      render(todos);
    } else if (event.target.id === "SA") {
      render(todos);
    } else if (event.target.id === "SC") {
      const onlyComplited = todos.filter((item) => item.isComplited === true);
      render(onlyComplited);
    }
  };
  
  const onItemClick = (event) => {
    if (event.target.id === "checkbox") {
      if (event.target.checked) {
        todos.forEach((item) => {
          if (+event.target.parentElement.id === +item.id) {
            item.isComplited = true;
          }
        });
      } else {
        todos.forEach((item) => {
          if (+event.target.parentElement.id === +item.id) {
            item.isComplited = false;
          }
        });
      }
      render(todos);
    } else if (event.target.id === "DO") {
      todos = todos.filter((item) => item.id != event.target.parentElement.id);
      render(todos);
    }
  };
  
  function render(todos) {
    const todo = createTodoList(todos);
    main.innerHTML = "";
    main.append(todo);
  }
  
  
  function createElement(tag, className, text = "") {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = text;
    return element;
  }
  
  function createHeader() {
    const title = createElement("p", "text-center text-muted fs-3", "ToDo List")
    const header = createElement("header", "d-flex align-items-center flex-column p-2 bd-highlight ");
    const div0 = createElement("div","d-flex p-2 bd-highlight align-items-center ","");
    const div1 = createElement("div","d-flex p-2 bd-highlight align-items-center ","");
    const div2 = createElement("div","d-flex flex-grow-1 align-items-center ","");
    const input = createElement("input", "form-control flex-grow-1");
    const buttonAdd = createElement("button", "btn btn-primary", "Add");
    const buttonDeleteAll = createElement("button", "btn btn-primary bg-danger border border-danger", "DeleteAll");
    const buttonDeleteLast = createElement("button", "btn btn-primary bg-danger border border-danger", "DeleteLast");
    const All = createElement("p", "text-center text-muted fs-3", "All: " + todos.length + "  ")
    const buttonShowAll = createElement("button", "btn btn-primary", "Show All");
    const buttonShowCompleted = createElement("button", "btn btn-primary", "Show Completed");
    input.id = "in";
    buttonAdd.id = "add";
    buttonDeleteAll.id = "DA";
    buttonDeleteLast.id = "DL";
    buttonShowAll.id = "SA";
    buttonShowCompleted.id = "SC";
    div0.append(title);
    div1.append(buttonShowAll, buttonShowCompleted, buttonDeleteAll, buttonDeleteLast, input, buttonAdd);
    div2.append(buttonShowAll, buttonShowCompleted);
    header.append(div0,div1 , div2);
    return header;
  }
  
  function createTodoList(todos) {
    const list = createElement("div", "d-flex flex-column gap-3", "");
    todos.forEach((td) => {
      const todoItem = createTodoItem(td);
      list.append(todoItem);
    });
    list.addEventListener("click", (event) => onItemClick(event));
    return list;
  }
  
  function createTodoItem(td) {
    const card = createElement("div", "d-flex align-items-center justify-content-between  border border-dark border-1 rounded");
    const checkbox = createElement("input", "", "");
    checkbox.type = "checkbox";
    checkbox.checked = td.isComplited;
    const text = createElement("p", "d-flex flex-grow-1 justify-content-center my-0 py-2", td.text);
    const date = createElement("p", "m-0  badge bg-secondary badge bg-secondary mx-3", td.date);
    const x = createElement("button", "btn-close bg-danger ");
    card.id = td.id;
    checkbox.id = "checkbox";
    x.id = "DO";
  
    card.append(checkbox, text, date, x);
    return card;
  }





