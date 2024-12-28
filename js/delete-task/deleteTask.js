/**
 * Deletes a task from the list of tasks.
 * @param { MouseEvent } e event triggered when user clicks on delete button.
 */
export function deleteTask(e) {
  if (confirm("Deseja mesmo excluir esta tarefa?")) {
    const tasktListItem = e.target.parentElement.parentElement;

    const taskId = tasktListItem.id;
    
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    const updatedTasks = tasks.filter((task) => task.id != taskId);
    
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    tasktListItem.remove();
  }
}