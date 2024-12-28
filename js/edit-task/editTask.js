import { toggleEditTaskModal } from "./toggleEditTaskModal.js";

let currentEditingTask = null; // Variable updated by ./js > utils.js > addTaskToList
const closeEditModal = document.querySelector("#close-onedit-modal");
const editTaskForm = document.querySelector("#onedit-task-form");

/**
 * Sets the current task that is being edited.
 * @param { Number } taskId 
 */
export function setCurrentEditingTask(taskId) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const task = tasks.find((task) => task.id == taskId);

  currentEditingTask = task;
}

/**
 * Edit a task from the list of tasks.
 * @param {{
 *  id: string,
 *  name: string,
 *  description: string,
 *  conclusionDate: string
 * }} editingTask 
 * @returns returns void in case of any error.
 */
function handleEditNewTask(editingTask) {
  const taskTitle = document.querySelector("#onedit-task-title-input").value;
  const taskDescription = document.querySelector("#onedit-task-description-input").value;
  const taskConclusionDate = document.querySelector("#onedit-task-conclusion-date-input").value;

  const titleError = document.querySelector("#onedit-title-error");
  const descriptionError = document.querySelector("#onedit-description-error");
  const conclusionDateError = document.querySelector("#onedit-conclusion-date-error");

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

  const prevTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const updatedTasks = prevTasks.map((task) => {
    if (task.id === editingTask.id) {
      return {
        ...task,
        name: taskTitle,
        description: taskDescription,
        conclusionDate: taskConclusionDate,
      };
    }

    return task;
  });

  localStorage.setItem("tasks", JSON.stringify(updatedTasks));

  editTaskForm.reset();

  toggleEditTaskModal();

  window.location.reload();
}

/* Event Listeners */

closeEditModal.addEventListener("click", toggleEditTaskModal);

editTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handleEditNewTask(currentEditingTask);
});