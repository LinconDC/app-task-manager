function sendDataToBackend(data) {
  console.log('Request....: ', JSON.stringify(data));
  fetch("http://localhost:8080/api/tasks", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      console.log('Response....: ', JSON.stringify(json));
    });
}

function getTaskById(id) {

  return fetch("http://localhost:8080/api/tasks/" + id, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching task:", error);
      throw error;
    });
}

async function handleClickSearchId() {
  
  try {
    const input = document.getElementById("taskId").value;
    const task = await getTaskById(input);
    if (task.id) {
      console.log('Get response...: ', JSON.stringify(task));
      renderTaskDetails(task);
    } else {
      renderErrorGetId(task);
    }
  } catch (error) {
    console.error("Error handling search:", error);
  }
}

function renderTaskDetails(task) {
  const taskDetailsList = document.getElementById("taskDetailsList");
  taskDetailsList.innerHTML = `
    <div class="taskData">
      <strong>Name: </strong> ${task.name || "null"}
      <br><strong>Stage: </strong> ${task.stage || "null"}
      <br><strong>Start Date: </strong> ${task.start_date || "null"}
      <br><strong>End Date: </strong> ${task.end_date || "null"}
      <br><strong>Historic: </strong> ${task.historic || "null"}
    </div>
  `;

  const taskDetailsDiv = document.getElementById("taskDetails");
  taskDetailsDiv.classList.remove("toggleScreen");
}

function renderErrorGetId(task) {
  const taskDetailsList = document.getElementById("taskDetailsList");
  taskDetailsList.innerHTML = `
    <div class="taskData">
      <strong>Error:</strong> Id not found.
      <br><strong>Details:</strong> ${task.details || "null"}
    </div>
  `;
}

function handleClickSend() {
  var form = document.getElementById("taskForm");
  const formData = {
    name: document.getElementById("tname").value,
    stage: document.getElementById("stage").value,
    start_date: Date.now(),
    end_date: document.getElementById("endDate").value,
    historic: document.getElementById("historic").value,
  };

  sendDataToBackend(formData);
  form.reset();
}

function handleScreenSearch() {
  const divCreate = document.querySelector(".create");
  divCreate.classList.add("toggleScreen");
  const divSearch = document.querySelector(".search");
  divSearch.classList.remove("toggleScreen");
}

function handleScreenCreate() {
  const divCreate = document.querySelector(".create");
  divCreate.classList.remove("toggleScreen");
  const divSearch = document.querySelector(".search");
  divSearch.classList.add("toggleScreen");
}
