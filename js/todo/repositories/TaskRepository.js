export class TaskRepository {
  tasks = [];

  static createTask(task) {
    this.tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  static fetchTasks() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return this.tasks;
  }

  static markTaskCompleted(taskId) {
    const task = this.tasks.find((_task) => _task.id === taskId);

    if (!task) {
      throw new Error('Task not found: ' + taskId);
    }

    task.finishedAt = new Date().getTime();
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  static markTaskUncompleted(taskId) {
    const task = this.tasks.find((_task) => _task.id === taskId);

    if (!task) {
      throw new Error('Task not found: ' + taskId);
    }

    task.finishedAt = null;
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  static deleteTask(taskId) {
    const taskIndex = this.tasks.findIndex((_task) => _task.id === taskId);

    if (taskIndex < 0) {
      throw new Error('Task not found: ' + taskId);
    }

    this.tasks.splice(taskIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}