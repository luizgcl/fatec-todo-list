import { Task } from './entities/Task';
import { TaskRepository } from './repositories/TaskRepository';

import { formatDate } from './utils/utils';

function addTask() {
  const taskDescription = document.getElementById('task').value;
  const task = new Task(taskDescription);

  TaskRepository.createTask(task);
}

function updateTaskList() {
  const tasks = TaskRepository.fetchTasks();
  const listBody = document.getElementById('table-body');

  tasks.forEach((task) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${task.description}</td>
      <td>${formatDate(task.insertedAt)}</td>
      <td>${task.finishedAt ? formatDate(task.finishedAt) : '-'}</td>
      <td><a>Finalizar</a></td>
      <td><a>Excluir</a></td>
    `
  
    listBody.appendChild(row);
  })
}

updateTaskList();