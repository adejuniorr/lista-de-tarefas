const editTaskModal = document.querySelector("#edit-task-modal");
const editTaskForm = document.querySelector("#onedit-task-form");
const editTaskTitleInput = document.querySelector("#onedit-task-title-input");
const editTasktTitleError = document.querySelector("#onedit-title-error");
const editTaskDescriptionInput = document.querySelector("#onedit-task-description-input");
const editTaskDescriptionError = document.querySelector("#onedit-description-error");
const editTaskConclusionDateInput = document.querySelector("#onedit-task-conclusion-date-input");
const editTaskConclusionDateError = document.querySelector("#onedit-conclusion-date-error");
editTaskConclusionDateInput.min = new Date().toISOString().split("T")[0];

export function toggleEditTaskModal(task) {
  const isEditModalOpen = editTaskModal.style.display === "flex";

  if (!isEditModalOpen) {
    editTaskTitleInput.value = task.name;
    editTaskDescriptionInput.value = task.description;
    editTaskConclusionDateInput.value = task.conclusionDate;

    editTaskModal.setAttribute("style", "display: flex;");

    return;
  }

  editTasktTitleError.textContent = "";
  editTaskDescriptionError.textContent = "";
  editTaskConclusionDateError.textContent = "";

  editTaskModal.setAttribute("style", "display: none;");
  
  editTaskForm.reset();

  return;
}
