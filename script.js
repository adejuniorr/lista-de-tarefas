// Pre-tasks
document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem("tasks")) {
    const preTasks = [
      {
        name: "Revisar proposta do cliente",
        description: "Analisar a proposta enviada pelo cliente para garantir que todos os requisitos foram cobertos.",
        conclusionDate: "2024-12-30",
      },
      {
        name: "Preparar relatório mensal",
        description: "Criar um relatório com os principais indicadores de desempenho do mês.",
        conclusionDate: "2025-01-03",
      },
      {
        name: "Atualizar documentação do projeto",
        description: "Revisar e atualizar a documentação técnica com as mudanças feitas na última sprint.",
        conclusionDate: "2025-01-05",
      },
      {
        name: "Planejar reunião de equipe",
        description: "Organizar a pauta e os materiais necessários para a reunião de planejamento trimestral.",
        conclusionDate: "2025-01-02",
      },
      {
        name: "Enviar orçamento para novo cliente",
        description: "Preparar e enviar o orçamento solicitado pelo cliente potencial.",
        conclusionDate: "2024-12-31",
      },
    ];

    localStorage.setItem("tasks", JSON.stringify(preTasks));
  }
});


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
  window.location.reload();
}

function toggleTaskModal() {
  const isOpen = createTaskModal.style.display === "flex";

  tasktTitleError.textContent = "";
  taskDescriptionError.textContent = "";
  taskConclusionDateError.textContent = "";
  
  createTaskForm.reset();

  createTaskModal.setAttribute("style", isOpen ? "display: none;" : "display: flex;");
}

// List tasks
const tasksList = document.querySelector("#tasks-list");

window.addEventListener("load", () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => addToTaskList(task));
});

function addToTaskList(task) {
  const taskItem = document.createElement("li");

  taskItem.innerHTML = `
    <div class="name_and_date">
      <p class="task_name">${task.name}</p>
      <p class="task_conclusion_date">Para: ${getFormattedDateString(task.conclusionDate)}</p>
    </div>
    <div class="buttons">
      <button class="edit" id="edit-task">Editar</button>
      <button class="delete" id="delete-task">Excluir</button>
    </div>
  `;

  tasksList.appendChild(taskItem);
}

function getFormattedDateString(dateString) {
  const day = dateString.split("-")[2];
  const month = dateString.split("-")[1];
  const year = dateString.split("-")[0];

  return `${day}/${month}/${year}`;
}

// Search task
const searchInput = document.querySelector("#search-task-input");

searchInput.addEventListener("input", handleSearchTask);

function handleSearchTask(e) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const filteredTasks = tasks.filter((task) => task.name.toLowerCase().includes(e.target.value.toLowerCase()));

  tasksList.innerHTML = "";

  filteredTasks.forEach((task) => addToTaskList(task));
}

// Delete task
window.addEventListener("load", () => {
  const deleteTaskButtons = document.querySelectorAll("button.delete");
  
  deleteTaskButtons.forEach((button) => {
    button.addEventListener("click", handleDeleteTask);
  });
});

function handleDeleteTask(e) {
  const taskName = e.target.parentElement.parentElement.querySelector(".task_name").textContent;

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const updatedTasks = tasks.filter((task) => task.name !== taskName);

  localStorage.setItem("tasks", JSON.stringify(updatedTasks));

  e.target.parentElement.parentElement.remove();
}