// addTask function
let taskDivNumber = 1;

const addTask = () => {
  let newTask = document.getElementById("input").value;
  const htmlString =
    '<div id="taskList' +
    taskDivNumber +
    '" class="taskList">' +
    newTask +
    '<div id="removeBtnCont">' +
    '<button id="removeBtn' +
    taskDivNumber +
    '" type="button" class="removeBtn" onclick="removeTask(' +
    taskDivNumber +
    ')">' +
    '<img src="pics/whiteCheckMark.png" alt="white cross" id="whiteCross" />' +
    "</button>" +
    "</div>" +
    "</div>";
  document
    .getElementById("savedTasks")
    .insertAdjacentHTML("beforeend", htmlString);
  taskDivNumber++;
  document.getElementById("input").value = "";
  saveToLocalStorage();
};

//if the enter gets pressed, it'll work same as the button click
const checkEnterKey = (event) => {
  if (event.key == "Enter") {
    addTask();
  }
};

// remove a task
let removedTaskId;
const contains = "taskList";

//the removeable button's id gets stored in a variable
const buttonClickHandler = (event) => {
  if (event.target.tagName === "BUTTON") {
    const target = event.target;
    if (target.id.includes(contains)) {
      removedTaskId = target.id;
      removeTask();
    }
  }
};

//all button get's stored in a variable and recieves the buttonClickHandler function as a click event listener
const buttons = document.querySelectorAll("button");
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", buttonClickHandler);
}

//this function gets the tasknumber, and contstructs the taskId with it. Then the function finds the element with the corresponding Id, and checks if removedTask variable holds a valid argument. If yes, the task with that id gets removed.
const removeTask = (taskNumber) => {
  const taskId = "taskList" + taskNumber;
  const removedTask = document.getElementById(taskId);
  if (removedTask) {
    removedTask.remove();
  }
  localStorage.removeItem("savedTasks");
  saveToLocalStorage();
};

// localstorage
const saveToLocalStorage = () => {
  const taskList = document.querySelector(".savedTasks");
  if (taskList) {
    //converting the div to a string representation using outerHTML
    taskListAsString = taskList.outerHTML;
    localStorage.setItem("savedTasks", taskListAsString);
  }
};

//load the saved div from localstorage
const localstorageOnLoad = () => {
  const savedTaskListAsString = localStorage.getItem("savedTasks");
  if (savedTaskListAsString) {
    document
      .querySelector(".savedTasks")
      .insertAdjacentHTML("beforeend", savedTaskListAsString);
  }
};
window.addEventListener("load", localstorageOnLoad());
