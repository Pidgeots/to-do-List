const inputEl = document.getElementById("input");
const clickBTN = document.getElementById("click");
const listEl = document.getElementById("list");

const notes = [
  {
    title: "Example_1",
    completed: true,
  },
  {
    title: "Example_2",
    completed: false,
  },
];

function render() {
  listEl.innerHTML = "";
  if (notes.length === 0) {
    listEl.innerHTML = "<p>Nothing to do</p>";
  }
  for (let i = 0; i < notes.length; i++) {
    listEl.insertAdjacentHTML("beforeend", getNote(notes[i], i));
  }
}

render();

clickBTN.onclick = function () {
  if (inputEl.value.lenght === 0) {
    exit(0);
  }
  const newNote = {
    title: inputEl.value,
    completed: false,
  };
  notes.push(newNote);
  render();
  inputEl.value = "";
};

listEl.onclick = function (event) {
  if (event.target.dataset.index) {
    const index = parseInt(event.target.dataset.index);
    const type = event.target.dataset.type;
    if (type === "toggle") {
      notes[index].completed = !notes[index].completed;
    } else if (type === "remove") {
      notes.splice(index, 1);
    }
    render();
  }
};

function getNote(note, index) {
  return `
      <li 
      class="list-group-item d-flex justify-content-between 
      align-items-center"
    >
      <span class="${note.completed ? "text-decoration-line-through" : ""}">${
    note.title
  }</span>
      <span>
        <span class="btn btn-small btn-${
          note.completed ? "warning" : "success"
        }" data-index="${index}" data-type="toggle">&check;</span>
        <span class="btn btn-small btn-danger" data-type="remove" 
        data-index="${index}">&times;</span>
      </span>
    </li>
    `;
}
