// Create new task
const openModal = document.querySelector("#add-task");
const closeModal = document.querySelector("#close-modal");
const createTaskModal = document.querySelector("#create-task-modal");
const createTaskForm = document.querySelector("#create-task-form");
const taskTitleInput = document.querySelector("#task-title-input");
const tasktTitleError = document.querySelector("#title-error");
const taskDescriptionInput = document.querySelector("#task-description-input");
const taskDescriptionError = document.querySelector("#description-error");
const taskConclusionDateInput = document.querySelector("#task-conclusion-date-input");
const taskConclusionDateError = document.querySelector("#conclusion-date-error");
const createTaskButton = document.querySelector("#create-task-button");

taskConclusionDateInput.min = new Date().toISOString().split("T")[0];

openModal.addEventListener("click", toggleTaskModal);

closeModal.addEventListener("click", toggleTaskModal);

createTaskForm.addEventListener("submit", handleCreateNewTask);

function handleCreateNewTask(e) {
  e.preventDefault();
  const taskTitle = taskTitleInput.value;
  const taskDescription = taskDescriptionInput.value;
  const taskConclusionDate = taskConclusionDateInput.value;

  console.log(taskConclusionDate);
  

  if (!taskTitle) {
    tasktTitleError.textContent = "Por favor, digite um título";
  }

  if (!taskDescription) {
    taskDescriptionError.textContent = "Escreva uma breve descrição sobre a tarefa";
  }

  if (!taskConclusionDate) {
    taskConclusionDateError.textContent = "Informe uma data de conclusão";
  }

  if (!taskTitle || !taskDescription || !taskConclusionDate) {
    return;
  }

  const task = {
    name: taskTitle,
    description: taskDescription,
    conclusionDate: taskConclusionDate,
  };

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  localStorage.setItem("tasks", JSON.stringify([...tasks, task]));

  createTaskForm.reset();
  toggleTaskModal();
}

function toggleTaskModal() {
  const isOpen = createTaskModal.style.display === "flex";

  tasktTitleError.textContent = "";
  taskDescriptionError.textContent = "";
  taskConclusionDateError.textContent = "";
  
  createTaskForm.reset();

  createTaskModal.setAttribute("style", isOpen ? "display: none;" : "display: flex;");
}