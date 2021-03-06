const d = document;
const formulario = d.getElementById('formulario');
const input = d.getElementById('input');
const listaTarea = d.getElementById('lista-tareas');
const template = d.getElementById('template').content;
const fragment = d.createDocumentFragment();
const tareaActual = d.getElementById('tarea-actual');
const tareaTexto = d.getElementById('tarea-texto');
const display = d.getElementById('display');

let tareas = {};
let tareaSeleccionada;
const bloqueTimeWork = d.getElementById('bloque-time-work');
const bloqueTimeRest = d.getElementById('bloque-time-rest');

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

//funcion para inicial contador pomodoro con boton
const iniciarContador = idBtn => {
  d.addEventListener('click', e => {
    // minutos = 1;
    // segundos = 0;
    if (e.target.matches(idBtn)) {
      setIntervalSegundos = setInterval(cargarSegundo, 1000);
    }
  });
};

d.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('tareas')) {
    tareas = JSON.parse(localStorage.getItem('tareas'));
  }
  pintarTareas();

  /* ***** inicio timer ****** */
  iniciarContador('#btn-start');
  /* ***** fin timer ****** */
});

/* inicio reproducir canciones */
// Carga un sonido a través de su fuente y lo inyecta de manera oculta
const cargarSonido = function (fuente) {
  const sonido = document.createElement('audio');
  sonido.src = fuente;
  sonido.setAttribute('preload', 'auto');
  sonido.setAttribute('controls', 'none');
  sonido.setAttribute('loop', 'true');
  sonido.style.display = 'none'; // <-- oculto
  document.body.appendChild(sonido);
  return sonido;
};
const $btnPlaySong1 = document.querySelector('#btnPlay-song1'),
  $btnPlaySong2 = document.querySelector('#btnPlay-song2'),
  $btnPlaySong3 = document.querySelector('#btnPlay-song3'),
  $btnPlaySong4 = document.querySelector('#btnPlay-song4'),
  $botonPausar = document.querySelector('#btn-stop'),
  // El sonido que podemos reproducir o pausar
  sonido1 = cargarSonido(
    'https://mus7.about-in.tk/skm/84a96513-ed00-4527-92e2-0c97c82d2d98.mp3',
  ),
  sonido2 = cargarSonido(
    'https://musicarelajante.me/wp-content/uploads/2016/11/Musica-para-estudiar-concentrarse-y-pensar.mp3',
  ),
  sonido3 = cargarSonido(
    'https://musicarelajante.me/wp-content/uploads/2017/05/Musica-relajante-para-estudiar-relajacion.mp3',
  ),
  sonido4 = cargarSonido(
    'https://mus10.about-in.tk/skm/30248394-1a65-4b5a-b21c-3d91b3a10169.mp3',
  );

$btnPlaySong1.addEventListener('click', e => {
  sonido2.pause();
  sonido3.pause();
  sonido4.pause();
  sonido1.play();
  $btnPlaySong2.classList.remove('animate__flip');
  $btnPlaySong2.classList.remove('animate__infinite');
  $btnPlaySong2.classList.remove('animate__zoomInUp');
  $btnPlaySong3.classList.remove('animate__flip');
  $btnPlaySong3.classList.remove('animate__infinite');
  $btnPlaySong3.classList.remove('animate__zoomInDown');
  $btnPlaySong4.classList.remove('animate__flip');
  $btnPlaySong4.classList.remove('animate__infinite');
  $btnPlaySong4.classList.remove('animate__zoomInUp');
  e.target.classList.add('animate__flip');
  e.target.classList.add('animate__infinite');
});

$btnPlaySong2.addEventListener('click', e => {
  sonido1.pause();
  sonido3.pause();
  sonido4.pause();
  sonido2.play();
  $btnPlaySong1.classList.remove('animate__flip');
  $btnPlaySong1.classList.remove('animate__infinite');
  $btnPlaySong1.classList.remove('animate__zoomInDown');
  $btnPlaySong3.classList.remove('animate__flip');
  $btnPlaySong3.classList.remove('animate__infinite');
  $btnPlaySong3.classList.remove('animate__zoomInDown');
  $btnPlaySong4.classList.remove('animate__flip');
  $btnPlaySong4.classList.remove('animate__infinite');
  $btnPlaySong4.classList.remove('animate__zoomInUp');
  e.target.classList.add('animate__flip');
  e.target.classList.add('animate__infinite');
});

$btnPlaySong3.addEventListener('click', e => {
  sonido1.pause();
  sonido2.pause();
  sonido4.pause();
  sonido3.play();
  $btnPlaySong1.classList.remove('animate__flip');
  $btnPlaySong1.classList.remove('animate__infinite');
  $btnPlaySong1.classList.remove('animate__zoomInDown');
  $btnPlaySong2.classList.remove('animate__flip');
  $btnPlaySong2.classList.remove('animate__infinite');
  $btnPlaySong2.classList.remove('animate__zoomInUp');
  $btnPlaySong4.classList.remove('animate__flip');
  $btnPlaySong4.classList.remove('animate__infinite');
  $btnPlaySong4.classList.remove('animate__zoomInUp');
  e.target.classList.add('animate__flip');
  e.target.classList.add('animate__infinite');
});

$btnPlaySong4.addEventListener('click', e => {
  sonido1.pause();
  sonido2.pause();
  sonido3.pause();
  sonido4.play();
  $btnPlaySong1.classList.remove('animate__flip');
  $btnPlaySong1.classList.remove('animate__infinite');
  $btnPlaySong1.classList.remove('animate__zoomInDown');
  $btnPlaySong2.classList.remove('animate__flip');
  $btnPlaySong2.classList.remove('animate__infinite');
  $btnPlaySong2.classList.remove('animate__zoomInUp');
  $btnPlaySong3.classList.remove('animate__flip');
  $btnPlaySong3.classList.remove('animate__infinite');
  $btnPlaySong3.classList.remove('animate__zoomInDown');
  e.target.classList.add('animate__flip');
  e.target.classList.add('animate__infinite');
});

$botonPausar.addEventListener('click', e => {
  sonido1.currentTime = 0;
  sonido2.currentTime = 0;
  sonido3.currentTime = 0;
  sonido4.currentTime = 0;
  sonido1.pause();
  sonido2.pause();
  sonido3.pause();
  sonido4.pause();
  $btnPlaySong1.classList.remove('animate__flip');
  $btnPlaySong1.classList.remove('animate__infinite');
  $btnPlaySong1.classList.remove('animate__zoomInDown');
  $btnPlaySong2.classList.remove('animate__flip');
  $btnPlaySong2.classList.remove('animate__infinite');
  $btnPlaySong2.classList.remove('animate__zoomInUp');
  $btnPlaySong3.classList.remove('animate__flip');
  $btnPlaySong3.classList.remove('animate__infinite');
  $btnPlaySong3.classList.remove('animate__zoomInDown');
  $btnPlaySong4.classList.remove('animate__flip');
  $btnPlaySong4.classList.remove('animate__infinite');
  $btnPlaySong4.classList.remove('animate__zoomInUp');
});
/* fin reproducir canciones */

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

const btnAccion = e => {
  // console.log(e.target.classList.contains('fa-check-circle'));
  if (e.target.classList.contains('fa-check-circle')) {
    // console.log(e.target.dataset.id);

    /* *********************** */
    bloqueTimeWork.classList.remove('d-none');
    bloqueTimeRest.classList.add('d-none');
    /* *********************** */
    tareas[e.target.dataset.id].estado = true;
    display.style.backgroundColor = '#d04643';
    tareaSeleccionada = e.target.parentNode.parentNode.textContent.trim();
    tareaActual.innerHTML = tareaSeleccionada;
    pintarTareas();
  }

  if (e.target.classList.contains('fa-minus-circle')) {
    delete tareas[e.target.dataset.id];
    tareaActual.innerHTML = '';
    pintarTareas();
  }

  if (e.target.classList.contains('fa-undo-alt')) {
    tareas[e.target.dataset.id].estado = false;
    tareaActual.innerHTML = '';
    pintarTareas();
  }

  e.stopPropagation();
};

/* ************* inicio configuracion timer ******* */

let horas = 0,
  minutos = 1,
  segundos = 0,
  segundosDescanso = 0,
  minutosDescanso = 1;
let setIntervalSegundos;
let setIntervalSegundosDescanso;

//Definimos y ejecutamos los segundos
function cargarSegundo() {
  let txtSegundos;

  if (segundos < 0) {
    segundos = 59;
  }

  //Mostrar segundos en pantalla
  if (segundos < 10) {
    txtSegundos = `0${segundos}`;
  } else {
    txtSegundos = segundos;
  }
  document.getElementById('segundos').innerHTML = txtSegundos;
  segundos--;

  cargarMinutos(segundos);
}

//Definimos y ejecutamos los minutos
function cargarMinutos(segundos) {
  let txtMinutos;

  if (segundos == -1 && minutos != 0) {
    let timeOutSegundos = setTimeout(() => {
      minutos--;
    }, 500);
  } else if (segundos == -1 && minutos == 0) {
    cargarSegundoDescanso();
    clearInterval(setIntervalSegundos);
    setIntervalSegundosDescanso = setInterval(cargarSegundoDescanso, 1000);
  }

  //Mostrar minutos en pantalla
  if (minutos < 10) {
    txtMinutos = `0${minutos}`;
  } else {
    txtMinutos = minutos;
  }

  document.getElementById('minutos').innerHTML = txtMinutos;
}
/* *********** tiempo de descanso ******* */

function cargarSegundoDescanso() {
  tareaActual.innerHTML = 'Momento de Descansar';
  let txtSegundosDescanso;

  if (segundosDescanso < 0) {
    segundosDescanso = 59;
  }

  //Mostrar segundos en pantalla
  if (segundosDescanso < 10) {
    txtSegundosDescanso = `0${segundosDescanso}`;
  } else {
    txtSegundosDescanso = segundosDescanso;
  }
  document.getElementById('segundos-descanso').innerHTML = txtSegundosDescanso;
  segundosDescanso--;

  cargarMinutosDescanso(segundosDescanso);
}

//Definimos y ejecutamos los minutos de descando
function cargarMinutosDescanso(segundosDescanso) {
  let txtMinutosDescanso;
  // tareaRealizar.innerHTML = '';
  bloqueTimeWork.classList.add('d-none');
  bloqueTimeRest.classList.remove('d-none');
  display.style.backgroundColor = '#56bd56';
  console.log('inicio minutos descanso');

  if (segundosDescanso == -1 && minutosDescanso != 0) {
    let timeOutSegundosDescanso = setTimeout(() => {
      minutosDescanso--;
    }, 500);
  } else if (segundosDescanso == -1 && minutosDescanso == 0) {
    // setTimeout(() => {
    // minutos = 59;
    // }, 500);
    clearInterval(setIntervalSegundosDescanso);
    console.log('se acabo el tiempo');
  }

  //Mostrar minutos en pantalla
  if (minutosDescanso < 10) {
    txtMinutosDescanso = `0${minutosDescanso}`;
  } else {
    txtMinutosDescanso = minutosDescanso;
  }

  document.getElementById('minutos-descanso').innerHTML = txtMinutosDescanso;
}

/* ************* fin configuracion timer ******* */
