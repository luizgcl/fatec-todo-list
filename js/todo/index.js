import { Task } from './entities/Task.js';
import { TaskRepository } from './repositories/TaskRepository.js';

import { formatDate } from './util/utils.js';

document.getElementById('form').addEventListener('submit', function(e) {
  e.preventDefault();
  addTask();
});

function addTask() {
  const taskDescription = document.getElementById('task').value;
  const task = new Task(taskDescription);

  TaskRepository.createTask(task);
  updateTaskList();
}

function excluirTarefa(taskId) {
  TaskRepository.deleteTask(taskId);
  updateTaskList();
}

function updateTaskList() {
  const tasks = TaskRepository.fetchTasks();
  const listBody = document.getElementById('table-body');
  listBody.innerHTML = '';
  tasks.forEach((task) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${task.description}</td>
      <td>${formatDate(task.insertedAt)}</td>
      <td>${task.finishedAt ? formatDate(task.finishedAt) : '-'}</td>
      <td><a>Finalizar</a></td>
      <td><button onclick="excluirTarefa(${task.id})">Excluir</button></td>
    `
  
    listBody.appendChild(row);
  })
}

updateTaskList();