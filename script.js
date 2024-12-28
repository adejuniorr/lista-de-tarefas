// Pre-tasks
document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem("tasks")) {
    const preTasks = [
      {
        id: 1,
        name: "Revisar proposta do cliente",
        description: "Analisar a proposta enviada pelo cliente para garantir que todos os requisitos foram cobertos.",
        conclusionDate: "2024-12-30",
      },
      {
        id: 2,
        name: "Preparar relatório mensal",
        description: "Criar um relatório com os principais indicadores de desempenho do mês.",
        conclusionDate: "2025-01-03",
      },
      {
        id: 3,
        name: "Atualizar documentação do projeto",
        description: "Revisar e atualizar a documentação técnica com as mudanças feitas na última sprint.",
        conclusionDate: "2025-01-05",
      },
      {
        id: 4,
        name: "Planejar reunião de equipe",
        description: "Organizar a pauta e os materiais necessários para a reunião de planejamento trimestral.",
        conclusionDate: "2025-01-02",
      },
      {
        id: 5,
        name: "Enviar orçamento para novo cliente",
        description: "Preparar e enviar o orçamento solicitado pelo cliente potencial.",
        conclusionDate: "2024-12-31",
      },
    ];

    localStorage.setItem("tasks", JSON.stringify(preTasks));
  }
});

// Create new task
const openCreateModal = document.querySelector("#add-task-button");
const closeCreateModal = document.querySelector("#close-create-modal");
const createTaskModal = document.querySelector("#create-task-modal");
const createTaskForm = document.querySelector("#create-task-form");
const createTaskTitleInput = document.querySelector("#create-task-title-input");
const createTasktTitleError = document.querySelector("#create-title-error");
const createTaskDescriptionInput = document.querySelector("#create-task-description-input");
const createTaskDescriptionError = document.querySelector("#create-description-error");
const createTaskConclusionDateInput = document.querySelector("#create-task-conclusion-date-input");
const createTaskConclusionDateError = document.querySelector("#create-conclusion-date-error");

createTaskConclusionDateInput.min = new Date().toISOString().split("T")[0];

openCreateModal.addEventListener("click", () => toggleTaskModal("create"));

closeCreateModal.addEventListener("click", () => toggleTaskModal("create"));

createTaskForm.addEventListener("submit", handleCreateNewTask);

function handleCreateNewTask(e) {
  e.preventDefault();
  const taskTitle = createTaskTitleInput.value;
  const taskDescription = createTaskDescriptionInput.value;
  const taskConclusionDate = createTaskConclusionDateInput.value;

  if (!taskTitle) {
    createTasktTitleError.textContent = "Por favor, digite um título";
  }

  if (!taskDescription) {
    createTaskDescriptionError.textContent = "Escreva uma breve descrição sobre a tarefa";
  }

  if (!taskConclusionDate) {
    createTaskConclusionDateError.textContent = "Informe uma data de conclusão";
  }

  if (!taskTitle || !taskDescription || !taskConclusionDate) {
    return;
  }

  const taskId = JSON.parse(localStorage.getItem("tasks")).length + 1;

  const task = {
    id: taskId,
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

// Edit new task
const closeEditModal = document.querySelector("#close-edit-modal");
const editTaskModal = document.querySelector("#edit-task-modal");
const editTaskForm = document.querySelector("#edit-task-form");
const editTaskTitleInput = document.querySelector("#edit-task-title-input");
const editTasktTitleError = document.querySelector("#edit-title-error");
const editTaskDescriptionInput = document.querySelector("#edit-task-description-input");
const editTaskDescriptionError = document.querySelector("#edit-description-error");
const editTaskConclusionDateInput = document.querySelector("#edit-task-conclusion-date-input");
const editTaskConclusionDateError = document.querySelector("#edit-conclusion-date-error");

editTaskConclusionDateInput.min = new Date().toISOString().split("T")[0];

closeEditModal.addEventListener("click", () => toggleTaskModal("edit"));

function handleEditNewTask(editingTask) {
  const taskTitle = editTaskTitleInput.value;
  const taskDescription = editTaskDescriptionInput.value;
  const taskConclusionDate = editTaskConclusionDateInput.value;

  if (!taskTitle) {
    editTasktTitleError.textContent = "Por favor, digite um título";
  }

  if (!taskDescription) {
    editTaskDescriptionError.textContent = "Escreva uma breve descrição sobre a tarefa";
  }

  if (!taskConclusionDate) {
    editTaskConclusionDateError.textContent = "Informe uma data de conclusão";
  }

  if (!taskTitle || !taskDescription || !taskConclusionDate) {
    return;
  }

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const updatedTasks = tasks.map((task) => {
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
  toggleTaskModal("edit");
  window.location.reload();
}

function toggleTaskModal(modalName, task) {
  if (modalName === "create") {
    const isCreateModalOpen = createTaskModal.style.display === "flex";

    createTasktTitleError.textContent = "";
    createTaskDescriptionError.textContent = "";
    createTaskConclusionDateError.textContent = "";

    createTaskForm.reset();

    createTaskModal.setAttribute("style", isCreateModalOpen ? "display: none;" : "display: flex;");

    return;
  }

  if (modalName === "edit") {
    const isEditModalOpen = editTaskModal.style.display === "flex";

    if (!isEditModalOpen) {
      editTaskTitleInput.value = task.name;
      editTaskDescriptionInput.value = task.description;
      editTaskConclusionDateInput.value = task.conclusionDate;

      editTaskModal.setAttribute("style", "display: flex;");
      editTaskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        handleEditNewTask(task)
      });
      
    } else {
      editTasktTitleError.textContent = "";
      editTaskDescriptionError.textContent = "";
      editTaskConclusionDateError.textContent = "";
      
      editTaskForm.reset();
      editTaskModal.setAttribute("style", "display: none;");
    }

    return;
  }
}

// List tasks
const tasksList = document.querySelector("#tasks-list");

window.addEventListener("load", () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => addToTaskList(task));
});

function addToTaskList(task) {
  const taskItem = document.createElement("li");
  taskItem.id = task.id;

  taskItem.innerHTML = `
    <div class="name_and_date">
      <p class="task_name">${task.name}</p>
      <p class="task_conclusion_date">Para: ${getFormattedDateString(task.conclusionDate)}</p>
    </div>
    <div class="buttons">
      <button class="edit">Editar</button>
      <button class="delete">Excluir</button>
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

// Edit task
window.addEventListener("load", () => {
  const editTaskButtons = document.querySelectorAll("button.edit");
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  editTaskButtons.forEach((button) => {
    const taskId = button.parentElement.parentElement.id;
    const task = tasks.find((task) => task.id == taskId);

    button.addEventListener("click", () => toggleTaskModal("edit", task));
  });
});