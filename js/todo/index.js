import { Task } from "./entities/Task.js";
import { TaskRepository } from "./repositories/TaskRepository.js";

import { formatDate } from "./util/utils.js";

document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  addTask();
  updateTaskList();
});

function addTask() {
  const taskDescription = document.getElementById("task").value;
  const task = new Task(taskDescription);

  TaskRepository.createTask(task);
  document.getElementById("task").value = "";
}

function removeTask(taskId) {
  TaskRepository.deleteTask(taskId);
}

function finishTask(taskId) {
  TaskRepository.markTaskCompleted(taskId);
}

function uncheckTask(taskId) {
  TaskRepository.markTaskUncompleted(taskId);
}

function updateTaskList() {
  const tasks = TaskRepository.fetchTasks();
  const listBody = document.getElementById("table-body");
  listBody.innerHTML = "";

  tasks.sort((a, b) => {
    return b.insertedAt - a.insertedAt;
  });

  tasks.forEach((task) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${task.description}</td>
      <td>${formatDate(task.insertedAt)}</td>
      <td>${task.finishedAt ? formatDate(task.finishedAt) : "-"}</td>
      ${
        task.finishedAt
          ? `<td><a id="${task.id}" class="uncheck">Retomar</a></td>`
          : `<td><a id="${task.id}" class="finish">Finalizar</a></td>`
      }
      <td><a id="${task.id}" class="delete">Excluir</a></td>
    `;

    listBody.appendChild(row);
  });

  document.querySelectorAll("a.delete").forEach((item) => {
    item.addEventListener("click", (event) => {
      removeTask(event.target.id);
      updateTaskList();
    });
  });

  document.querySelectorAll("a.finish").forEach((item) => {
    item.addEventListener("click", (event) => {
      finishTask(event.target.id);
      updateTaskList();
    });
  });

  document.querySelectorAll("a.uncheck").forEach((item) => {
    item.addEventListener("click", (event) => {
      uncheckTask(event.target.id);
      updateTaskList();
    });
  });
}

updateTaskList();
