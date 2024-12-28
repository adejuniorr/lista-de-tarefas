import { toggleCreateTaskModal } from "./toggleCreateTaskModal.js";

const openModal = document.querySelector("#open-oncreate-modal");
openModal.addEventListener("click", toggleCreateTaskModal);

const closeModal = document.querySelector("#close-oncreate-modal");
closeModal.addEventListener("click", toggleCreateTaskModal);

const createTaskForm = document.querySelector("#oncreate-task-form");
createTaskForm.addEventListener("submit", handleNewTask);

function handleNewTask(e) {
  e.preventDefault();
  
  const taskTitle = document.querySelector("#oncreate-task-title-input").value;
  const taskDescription = document.querySelector("#oncreate-task-description-input").value;
  const taskConclusionDate = document.querySelector("#oncreate-task-conclusion-date-input").value;
  
  const titleError = document.querySelector("#oncreate-title-error");
  const descriptionError = document.querySelector("#oncreate-description-error");
  const conclusionDateError = document.querySelector("#oncreate-conclusion-date-error");

  if (!taskTitle) {
    titleError.textContent = "Por favor, digite um título";
  }

  if (!taskDescription) {
    descriptionError.textContent = "Escreva uma breve descrição sobre a tarefa";
  }

  if (!taskConclusionDate) {
    conclusionDateError.textContent = "Informe uma data de conclusão";
  }

  if (!taskTitle || !taskDescription || !taskConclusionDate) {
    return;
  }

  const newTaskId = JSON.parse(localStorage.getItem("tasks")).length + 1;

  const newTask = {
    id: newTaskId,
    name: taskTitle,
    description: taskDescription,
    conclusionDate: taskConclusionDate,
  };

  const prevTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  localStorage.setItem("tasks", JSON.stringify([...prevTasks, newTask]));

  createTaskForm.reset();

  toggleCreateTaskModal();

  window.location.reload();
}