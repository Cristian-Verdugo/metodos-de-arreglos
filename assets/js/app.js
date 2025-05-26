let tareas = [
  { id: 16, descripcion: "Hacer mercado", completado: true },
  { id: 60, descripcion: "Estudiar para la prueba", completado: false },
  { id: 24, descripcion: "Sacar a pasear a Tobby", completado: false }
];

const lista = document.getElementById("listaTareas");
const totalSpan = document.getElementById("total");
const realizadasSpan = document.getElementById("realizadas");

function renderTareas() {
  lista.innerHTML = "";
  tareas.forEach((tarea) => {
    lista.innerHTML += `
      <tr>
        <td>${tarea.id}</td>
        <td class="${tarea.completado ? 'completed' : ''}">${tarea.descripcion}</td>
        <td><input type="checkbox" ${tarea.completado ? "checked" : ""} onchange="toggleCompletado(${tarea.id})"></td>
        <td><button onclick="eliminarTarea(${tarea.id})">❌</button></td>
      </tr>
    `;
  });
  actualizarResumen();
}

function agregarTarea() {
  const input = document.getElementById("nuevaTarea");
  const descripcion = input.value.trim();
  if (descripcion === "") return;

  const nueva = {
    id: Date.now(),
    descripcion,
    completado: false
  };
  tareas.push(nueva);
  input.value = "";
  renderTareas();
}

function eliminarTarea(id) {
  tareas = tareas.filter(t => t.id !== id);
  renderTareas();
}

function toggleCompletado(id) {
  const tarea = tareas.find(t => t.id === id);
  if (tarea) {
    tarea.completado = !tarea.completado;
    renderTareas();
  }
}

function actualizarResumen() {
  totalSpan.textContent = tareas.length;
  realizadasSpan.textContent = tareas.filter(t => t.completado).length;
}

document.addEventListener("DOMContentLoaded", renderTareas);