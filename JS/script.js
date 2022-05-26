{
  const hello = () => {
    console.log("Witam :)")
  }

  const tasks = [
    {
      content: "ubrać się",
      done: false
    },

    {
      content: "umyć się",
      done: true
    },
  ];



  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
      <fieldset class="form__fieldset--list">
      <ul class="form__list">
        <li class="form__list--table">
          <button class="button__done js-done">${task.done ? " ✔" : " "}</button>
          <span
            class="form__list--content ${task.done ? "task__done" : ""}">
           ${task.content}
          </span>
          <button class="button__delete js-delete">🗑️</button>
        </li>
      </ul>
      </fieldset>
      `
    };
    document.querySelector(".js-list").innerHTML = htmlString;
    deleteTaskButton();
    taskDoneButton();
  };


  const deleteTask = (index) => {
    tasks.splice(index, 1);
    render();
  };

  const deleteTaskButton = () => {
    const deleteButton = document.querySelectorAll(".js-delete");
    deleteButton.forEach((deleteButton, index) => {
      deleteButton.addEventListener("click", () => {
        deleteTask(index);
      })
    })
  };

  const toggleTaskDone = (index) => {
    tasks[index].done = !tasks[index].done
    render();
  }

  const taskDoneButton = () => {
    const taskDoneButton = document.querySelectorAll(".js-done");
    taskDoneButton.forEach((taskDoneButton, index) => {
      taskDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      })
    })
  };



  const addNewTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
      done: false,
    });
    render();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-input").value.trim();

    if (newTaskContent === "") {
      return;
    }

    addNewTask(newTaskContent);
    focusOnInput();

  };

  const focusOnInput = () => {
    const NewTaskBox = document.querySelector(".js-input");
    NewTaskBox.focus();
    NewTaskBox.value = "";
  }


  const init = () => {
    hello();
    render();
    const formElement = document.querySelector(".js-form");
    formElement.addEventListener("submit", onFormSubmit);

  };

  init();

}