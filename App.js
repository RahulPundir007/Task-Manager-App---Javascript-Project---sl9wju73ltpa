const taskName = document.getElementById("add-task");
let id = 0;
localStorage.clear();
let currDragNode = null;
function onAddTask(e) {
  if (taskName.value != "") {
    id++;
    let openSection = document.getElementById("open-section-cards");
    let list = document.createElement("li");
    list.setAttribute("draggable", "true");
    list.classList.add("open-card");
    list.innerText = taskName.value;
    openSection.appendChild(list).classList.add("task");
    taskName.value = "";
    let currId = id;

    list.addEventListener("click", (e) => {
      onClickOfTask(currId, e);
    });

    list.addEventListener("dragstart", (e) => {
      drag(e);
    });
  }
}
let textDs = document.getElementById("task-description");

function onClickOfTask(id, e) {
  let taskmodal = document.getElementById("taskModal");
  let saveBtn = document.getElementById("save-btn");
  taskmodal.style.display = "inline";

  if (localStorage.getItem(id)) {
    textDs.value = localStorage.getItem(id);
  } else {
    textDs.value = "";
  }

  // When the user clicks on the cross icon, close it
  let closeBtn = document.getElementById("close-btn");
  closeBtn.onclick = function () {
    taskmodal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (e) {
    if (e.target == taskmodal) {
      taskmodal.style.display = "none";
    }
  };
  saveBtn.onclick = (e) => {
    save(id, e);
  };
  function save(id, e) {
    localStorage.setItem(id, textDs.value);
    taskmodal.style.display = "none";
  }
}

function allowDrop(e) {
  e.preventDefault();
}

function drag(e) {
  currDragNode = e.target;
}

function removeClasses() {
  currDragNode.classList.remove(
    "inreview-card",
    "inprogress-card",
    "open-card",
    "done-card"
  );
}
function drop(e) {
  e.preventDefault();
  switch (e.target.id) {
    case "inreview-section-cards":
      removeClasses();
      currDragNode.classList.add("inreview-card");
      break;
    case "inprogress-section-cards":
      removeClasses();
      currDragNode.classList.add("inprogress-card");
      break;
    case "open-section-cards":
      removeClasses();
      currDragNode.classList.add("open-card");
      break;
    case "done-section-cards":
      removeClasses();
      currDragNode.classList.add("done-card");
      break;
  }
  e.target.appendChild(currDragNode);
}
