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
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">${
        task.description
      }</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">${formatDate(
        task.insertedAt
      )}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">${
        task.finishedAt ? formatDate(task.finishedAt) : "-"
      }</td>
      ${
        task.finishedAt
          ? `<td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <a id="${task.id}" class="uncheck cursor-pointer hover:text-emerald-200">Retomar</a>
            </td>`
          : `<td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <a id="${task.id}" class="finish cursor-pointer hover:text-red-200">Finalizar</a>
            </td>`
      }
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <a id="${
          task.id
        }" class="delete cursor-pointer hover:text-red-700">Excluir</a>
      </td>
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
