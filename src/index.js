import "./style.css";

const tasks = [
  {
    description: "Learn JS, HTML & CSS",
    completed: false,
    index: 1,
  },
  {
    description: "Go to gym",
    completed: true,
    index: 2,
  },
  {
    description: "Buy protein",
    completed: false,
    index: 3,
  },
];

const taskList = () => {
  let content = "";
  tasks.forEach((task) => {
    content += `
    <ul  id="task-list">
        <li class="task-list" id="toDo"><input type="checkbox" id="checkbox"  value="task">${task.description}</li>
    </ul>

    `;
  });
  return content;
};

const rendering = () => document.getElementById("to-dos");

window.addEventListener("load", () => {
  const content = taskList();
  rendering().innerHTML = content;
});
