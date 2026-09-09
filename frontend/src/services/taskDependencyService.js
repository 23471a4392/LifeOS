export const canCompleteTask = (task, allTasks) => {
  if (!task.dependsOn || task.dependsOn.length === 0) return true;
  return task.dependsOn.every(id => allTasks.some(t => t.id === id && t.completed));
};
