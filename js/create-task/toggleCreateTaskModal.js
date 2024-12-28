const createTaskModal = document.querySelector("#create-task-modal");
const createTaskForm = document.querySelector("#oncreate-task-form");
const createTasktTitleError = document.querySelector("#oncreate-title-error");
const createTaskDescriptionError = document.querySelector("#oncreate-description-error");
const createTaskConclusionDateError = document.querySelector("#oncreate-conclusion-date-error");
const createTaskConclusionDateInput = document.querySelector("#oncreate-task-conclusion-date-input");
createTaskConclusionDateInput.min = new Date().toISOString().split("T")[0];

export function toggleCreateTaskModal() {
  const isCreateModalOpen = createTaskModal.style.display === "flex";

  if (!isCreateModalOpen) {
    createTaskModal.setAttribute("style", "display: flex;");
    return;
  }

  createTasktTitleError.textContent = "";
  createTaskDescriptionError.textContent = "";
  createTaskConclusionDateError.textContent = "";

  createTaskModal.setAttribute("style", "display: none;");

  createTaskForm.reset();

  return;
}