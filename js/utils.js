import { toggleEditTaskModal } from "./edit-task/toggleEditTaskModal.js";
import { setCurrentEditingTask } from "./edit-task/editTask.js";
import { deleteTask } from "./delete-task/deleteTask.js";

const tasksList = document.querySelector("#tasks-list");
const searchInput = document.querySelector("#search-task-input");

/**
 * Adds a new task to the unordered list (ul) of tasks.
 * @param {{
 *  id: string,
 *  name: string,
 *  description: string,
 *  conclusionDate: string
 * }} newTask new task object to be added to the list.
 */
export function addTaskToList(newTask) {
  const li = document.createElement("li");

  li.id = newTask.id;

  li.innerHTML = `
    <div class="name_and_date">
      <p class="task_name">${newTask.name}</p>
      <p class="task_conclusion_date">Para: ${getFormattedDateString(newTask.conclusionDate)}</p>
    </div>
    <div class="buttons">
      <button class="edit">Editar</button>
      <button class="delete">Excluir</button>
    </div>
  `;

  tasksList.appendChild(li);

  const editTaskButton = li.querySelector(".edit");

  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const foundTask = tasks.find((task) => task.id == newTask.id);

  editTaskButton.addEventListener("click", () => {
    setCurrentEditingTask(newTask.id);
    toggleEditTaskModal(foundTask);
  });

  const deleteTaskButton = li.querySelector(".delete");

  deleteTaskButton.addEventListener("click", deleteTask);
}

/**
 * Formates a date string from "YYYY-MM-DD" to "DD/MM/YYYY".
 * @param { string } dateString string representing a date in the format "YYYY-MM-DD".
 * @returns a string representing the date in the format "DD/MM/YYYY".
 */
function getFormattedDateString(dateString) {
  const day = dateString.split("-")[2];
  const month = dateString.split("-")[1];
  const year = dateString.split("-")[0];

  return `${day}/${month}/${year}`;
};

/**
 * Handle the search of tasks filtering by the name of the task.
 * @param { InputEvent } e trigered input event when user types on search input.
 */
function handleSearchTask(e) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const filteredTasks = tasks.filter((task) => task.name.toLowerCase().includes(e.target.value.toLowerCase()));

  tasksList.innerHTML = "";

  filteredTasks.forEach((task) => addTaskToList(task));
}

/* Event Listeners */

searchInput.addEventListener("input", handleSearchTask);

window.addEventListener("load", () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => addTaskToList(task));
});

// Set preTasks if there are no tasks in the localStorage:
document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("tasks")) {
    const today = new Date();

    const preTasks = [
      { id: 1, name: "Leitura matinal", description: 'Ler ao menos duas páginas do livro "Meditações" de Marco Aurélio.', conclusionDate: today.toISOString().split("T")[0] },
      { id: 2, name: "Cozinhar nova receita de macarrão", description: "Experimentar uma receita diferente de macarrão, adicionando um toque de criatividade com novos ingredientes.", conclusionDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString().split("T")[0] },
      { id: 3, name: "Finalizar CRUD de produtos", description: "Completar a implementação do sistema de gerenciamento de produtos no projeto, incluindo todas as operações de CRUD.", conclusionDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3).toISOString().split("T")[0] },
      { id: 4, name: "Estudar para a prova de Banco de Dados", description: "Revisar os principais tópicos do conteúdo programático da prova, como modelagem e consultas SQL.", conclusionDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5).toISOString().split("T")[0] },
      { id: 5, name: "Encontrar amigos", description: "Organizar um encontro com os amigos para colocar a conversa em dia e relaxar.", conclusionDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7).toISOString().split("T")[0] }
    ];

    localStorage.setItem("tasks", JSON.stringify(preTasks));
  }
});