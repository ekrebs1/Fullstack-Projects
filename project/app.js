let allTodos;
let pendingTodos, completedTodos, expiredTodos;

function storeData() {
  localStorage.setItem("allTodos", JSON.stringify(fetchDefaultTodos));
}

function retrieveData() {
  allTodos =
    JSON.parse(localStorage.getItem("fetchDefaultTodos")) ||
    fetchDefaultTodos();
}

function isCurrent(todo) {
  const todoDueDate = new Date(todo.dueDate);
  const now = new Date();
  return now < todoDueDate;
}

function splitTodos() {
  pendingTodos = allTodos.filter(function (todo) {
    let isCurrentTodo = isCurrent(todo);
    if (isCurrentTodo === true && todo.isComplete === false) {
      return true;
    }
  });
  completedTodos = allTodos.filter(function (todo) {
    return todo.isComplete === true;
  });
  expiredTodos = allTodos.filter(function (todo) {
    let isCurrentTodo = isCurrent(todo);
    if (isCurrentTodo === false && todo.isComplete === false) {
      return true;
    }
  });
}

function fetchDefaultTodos() {
  let defaultTodos = [
    {
      title: "Open the left Drawer",
      dueDate: "02-28-2022",
      description: 
      `Click on the left below the icons to \n expand the left drawer.\n 
      When done, click complete on this todo`,
      isComplete: false,
    },

    {
      title: "Make a new Todo",
      dueDate: "02-28-2022",
      description: `Click on the plus symbol.\n
      Then, fill out the modal form \n that pops up and click create!`,
      isComplete: false,
    },

    {
      title: "Make an Expired TODO",
      dueDate: "02-28-2022",
      description: `Create a new todo again, \n but with a past due date. \n
    Click Complete when Finished`,
      isComplete: false,
    },

    {
      title: "Remove All Expired Todos",
      dueDate: "02-27-2021",
      description: `Expand the left drawer to click \n on the icon that will remove all \n expired todos. `,
      isComplete: false,
    },

    {
      title: "Remove All Completed Todos",
      dueDate: "02-28-2022",
      description: `Click the checkmark in the left drawer \n to clear all completed todos.`,
      isComplete: true,
    },
  ];
  return defaultTodos;
}

$(".left-drawer").click(function () {
  $("#app").toggleClass("drawer-open");
});

function createElementFromTodo(todo) {
  let todoCard = `
  <div class="todo">
  <h3><span class="title">${todo.title}</span>
  <span class="due-date">${todo.dueDate}</span></h3>
  <pre>${todo.description}</pre>
  <footer class="actions">
    ${
      todo.isComplete ? "" : '<button class="action complete">Complete</button>'
    }    
    <button class="action delete">Delete</button>
  </footer>
</div>
  `;
  todoCard = $(todoCard).data("todo", todo);
  return todoCard;
}

function renderTodos() {
  $("main .content").empty();
  pendingTodos.forEach(function (todo) {
    let renderTodo = createElementFromTodo(todo);
    $(".pending-todos").append(renderTodo);
  });
  completedTodos.forEach(function (todo) {
    let renderTodo = createElementFromTodo(todo);
    $(".completed-todos").append(renderTodo);
  });
  expiredTodos.forEach(function (todo) {
    let renderTodo = createElementFromTodo(todo);
    $(".expired-todos").append(renderTodo);
  });
}

function createTodoOnClick(event) {
  event.preventDefault();
  const createdTodo = createTodoFromForm();
  allTodos.unshift(createdTodo);
  $(this).trigger("reset");
  $(".modal").removeClass("open");
  repeatFunctions();
}
function createTodoFromForm() {
  const newTodo = {
    title: $("#todo-title").val(),
    dueDate: $("#todo-due-date").val(),
    description: $("#todo-description").val(),
    isComplete: false,
  };
  return newTodo;
}
function removeComp() {
  allTodos = allTodos.filter(function (todo) {
    if (!todo.isComplete) {
      return todo;
    }
  });
}
function removeExp() {
  allTodos = allTodos.filter(function (todo) {
    let isCurrentTodo = isCurrent(todo);
    if (isCurrentTodo) {
      return todo;
    }
  });
}

$(".add-todo").click(function () {
  $(".modal").addClass("open");
});

$(".create-todo").click(createTodoOnClick);
$(".cancel-create-todo").click(function () {
  $(".modal").removeClass("open");
});
$("main").on("click", ".action.complete", function () {
  let parent = $(this.closest(".todo")).data();
  parent.todo.isComplete = true;
  repeatFunctions();
});
$("main").on("click", ".action.delete", function () {
  let parent = $(this.closest(".todo")).data();
  let deleteIndex = allTodos.indexOf(parent.todo);
  allTodos.splice(deleteIndex, 1);
  repeatFunctions();
});
$(".left-drawer").on("click", ".action.remove-completed", function () {
  removeComp();
  repeatFunctions();
});
$(".left-drawer").on("click", ".action.remove-expired", function () {
  removeExp();
  repeatFunctions();
});

function repeatFunctions() {
  storeData();
  splitTodos();
  renderTodos();
}

retrieveData();
splitTodos();
renderTodos();
