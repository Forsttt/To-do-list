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
        <li class= "form__list--table">
          <button  class="button__done">✔</button>
          <span ${task.done ? " class=\"form__list--content task__done\" " : " class=\"form__list--content\" "}
          >${task.content}</span>
          <button class="button__delete js-delete">🗑️</button>
        </li>
      </ul>
      </fieldset>
      `
    };
    document.querySelector(".js-list").innerHTML = htmlString;
    deleteTaskButton();
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
  };

  const init = () => {
    hello();
    render();

    const formElement = document.querySelector(".js-form");
    formElement.addEventListener("submit", onFormSubmit);
  };

  init();

}