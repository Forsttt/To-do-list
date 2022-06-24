{
  let tasks = [];
  let hideTaskButtons = false;

  const render = () => {
    renderTaskButtons();
    renderTasks();

    bindOutsideListButtons();
    bindInsideListButtons();
  };

  const renderTasks = () => {
    const htmlString = tasks.map(task => `
        <li class="list__item ${task.done && hideTaskButtons ? "list__item--hidden" : ""}">
          <button class="list__button js-done">${task.done ? "✔" : ""}</button>
            <span
            class="list__content ${task.done ? "markedAsDone" : " "}">
              ${task.content}
            </span>
          <button class="list__button list__button--delete js-delete">🗑️</button>
        </li>
      `);

    document.querySelector(".js-list").innerHTML = htmlString.join("");
  };

  const renderTaskButtons = () => {
    const listButtons = document.querySelector(".js-allTaskButtons")
    if (tasks.length === 0) {
      listButtons.innerHTML = "";
    }
    else {
      listButtons.innerHTML =
        `
      <button class="list__allTaskButton js-hideDoneTask">${hideTaskButtons ? "pokaż ukończone" : "urkyj ukończone"}</button>
      <button class="list__allTaskButton js-allTaskDone" ${tasks.every(({ done }) => done) ? "disabled" : ""}>ukończ wszystkie</button>
      `
    };
  };

  const hideDoneTask = () => {
    hideTaskButtons = !hideTaskButtons
    render();
  };

  const turnAllTasksDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));
    render();
  };

  const bindOutsideListButtons = () => {
    const hideDoneTaskButton = document.querySelector(".js-hideDoneTask");
    if (hideDoneTaskButton) {
      hideDoneTaskButton.addEventListener("click", hideDoneTask)
    };

    const allTaskButtons = document.querySelector(".js-allTaskDone")
    if (allTaskButtons) {
      allTaskButtons.addEventListener("click", turnAllTasksDone)
    };
  };

  const deleteTask = (index) => {
    tasks = [
      ...tasks.slice(0, index),
      ...tasks.slice(index + 1)
    ]
    render();
  };

  const toggleTaskDone = (index) => {
    tasks = [
      ...tasks.slice(0, index),
      { ...tasks[index], done: !tasks[index].done },
      ...tasks.slice(index + 1)
    ]
    render();
  };

  const bindInsideListButtons = () => {
    const deleteButton = document.querySelectorAll(".js-delete");
    deleteButton.forEach((deleteButton, index) => {
      deleteButton.addEventListener("click", () => {
        deleteTask(index);
      })
    });

    const taskDoneButton = document.querySelectorAll(".js-done");
    taskDoneButton.forEach((taskDoneButton, index) => {
      taskDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      })
    });
  };

  const addNewTask = (newTaskContent) => {
    tasks = [
      ...tasks,
      {
        content: newTaskContent,
        done: false,
      }
    ];
    render();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-input").value.trim();

    if (newTaskContent === "") {
      return;
    };

    addNewTask(newTaskContent);
    focusOnInput();
  };

  const focusOnInput = () => {
    const NewTaskBox = document.querySelector(".js-input");
    NewTaskBox.focus();
    NewTaskBox.value = "";
  };

  const init = () => {
    render();
    const formElement = document.querySelector(".js-form");
    formElement.addEventListener("submit", onFormSubmit);
  };

  init();
};