const d = document;
const formulario = d.getElementById('formulario');
const input = d.getElementById('input');
const listaTarea = d.getElementById('lista-tareas');
const template = d.getElementById('template').content;
const fragment = d.createDocumentFragment();
let tareas = {};

d.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('tareas')) {
    tareas = JSON.parse(localStorage.getItem('tareas'));
  }
  pintarTareas();
});

listaTarea.addEventListener('click', e => {
  btnAccion(e);
});

formulario.addEventListener('submit', e => {
  e.preventDefault();
  setTarea(e);
});

const setTarea = e => {
  if (input.value.trim() === '') {
    console.log('esta vacio');
    return;
  }

  const tarea = {
    id: Date.now(),
    texto: input.value,
    estado: false,
  };

  tareas[tarea.id] = tarea;

  // console.log(tareas);

  formulario.reset();
  input.focus();

  pintarTareas();
};

const pintarTareas = () => {
  localStorage.setItem('tareas', JSON.stringify(tareas));

  if (Object.values(tareas).length === 0) {
    listaTarea.innerHTML = `
      <div class='alert alert-dark text-center'>
        No hay tareas pendientes 😍
      </div>
    `;
    return;
  }

  listaTarea.innerHTML = '';
  // esta funcion recorre un objeto
  Object.values(tareas).forEach(tarea => {
    //para usar template primero se hace el clon del template
    const clone = template.cloneNode(true);
    //modificamos el clone del template
    clone.querySelector('p').textContent = tarea.texto;

    if (tarea.estado) {
      clone
        .querySelector('.alert')
        .classList.replace('alert-warning', 'alert-primary');

      clone
        .querySelectorAll('.fas')[0]
        .classList.replace('fa-check-circle', 'fa-undo-alt');

      clone.querySelector('p').style.textDecoration = 'line-through';
    }

    clone.querySelectorAll('.fas')[0].dataset.id = tarea.id;
    clone.querySelectorAll('.fas')[1].dataset.id = tarea.id;
    // agregamos al fragment lo que hemos clonado
    fragment.appendChild(clone);
  });
  //pintamos el fragment en el DOM, es importante hacerlo fuera del forEach
  listaTarea.appendChild(fragment);
};

const btnAccion = e => {
  // console.log(e.target.classList.contains('fa-check-circle'));
  if (e.target.classList.contains('fa-check-circle')) {
    // console.log(e.target.dataset.id);
    tareas[e.target.dataset.id].estado = true;
    pintarTareas();
  }

  if (e.target.classList.contains('fa-minus-circle')) {
    delete tareas[e.target.dataset.id];
    pintarTareas();
  }

  if (e.target.classList.contains('fa-undo-alt')) {
    tareas[e.target.dataset.id].estado = false;
    pintarTareas();
  }

  e.stopPropagation();
};
