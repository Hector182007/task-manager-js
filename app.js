const btnAgregar = document.getElementById('agregar-btn');
const inputTarea = document.getElementById('tarea-input');
const listaDeTareas = document.getElementById('lista-de-tareas');

const textoContador = document.getElementById('contador-tareas');
const btnFiltroTodas = document.getElementById('filtro-todas');

const btnFiltroPendientes = document.getElementById('filtro-pendientes');

const btnFiltroCompletadas = document.getElementById('filtro-completadas');

const btnLimpiar = document.getElementById('btn-limpiar');

let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

function guardarEnLocalStorage() { 
    localStorage.setItem('tareas', JSON.stringify(tareas)); 
}

function actualizarContador() { const pendientes = tareas.filter(tarea => tarea.completada === false);

textoContador.textContent = `${pendientes.length} tareas pendientes`;
}

function crearElementoTarea(tarea) {
    const nuevaTarea = document.createElement('li');
    nuevaTarea.innerHTML = `
        <input type="checkbox" class="check-tarea">
        <span class="texto-tarea">${tarea.texto}</span> 
        <button class="btn-eliminar">Eliminar</button>
    `;

    const btnEliminar = nuevaTarea.querySelector('.btn-eliminar');
    const checkTarea = nuevaTarea.querySelector('.check-tarea');
    const textoSpan = nuevaTarea.querySelector('.texto-tarea');

    if (tarea.completada === true) {
        checkTarea.checked = true;
        textoSpan.classList.add('completada');
    }

    btnEliminar.addEventListener('click', function() {
        nuevaTarea.remove();
        actualizarContador();
        tareas = tareas.filter(t => t !== textoTarea);
        guardarEnLocalStorage();
    });

    checkTarea.addEventListener('change', function() { 
        textoSpan.classList.toggle('completada', checkTarea.checked);
        tarea.completada = checkTarea.checked;
        guardarEnLocalStorage();
        actualizarContador();
    });

    textoSpan.addEventListener('dblclick', function() {
        textoSpan.contentEditable = true;
        textoSpan.focus();
    });
   
    textoSpan.addEventListener('keydown', function(evento) {
        if (evento.key === 'Enter') {
            evento.preventDefault();
            textoSpan.contentEditable = false;

            tarea.texto = textoSpan.textContent.trim();
            guardarEnLocalStorage();
        }   
    });

    textoSpan.addEventListener('blur', function() {
        textoSpan.contentEditable = false;
        tarea.texto = textoSpan.textContent.trim();
        guardarEnLocalStorage();
    });

    return nuevaTarea;
}

function renderizarTareas(arregloDeTareas) { 
    listaDeTareas.innerHTML = '';

    arregloDeTareas.forEach(function(tarea) { 
        const elemento = crearElementoTarea(tarea);
        listaDeTareas.appendChild(elemento);
    });

}

renderizarTareas(tareas);
actualizarContador();

function actualizarBotonesFiltro(botonActivo) {
    btnFiltroTodas.classList.remove('activo');
    btnFiltroPendientes.classList.remove('activo');
    btnFiltroCompletadas.classList.remove('activo');

    botonActivo.classList.add('activo');
}

btnAgregar.addEventListener('click', function() {
    const textoTarea = inputTarea.value.trim();

    if (textoTarea === '') {
        alert('Por favor, escribe una tarea válida.');
        return; 
    }
    const nuevoObjetoTarea = { texto: textoTarea, completada: false };

    const elemento = crearElementoTarea(nuevoObjetoTarea);
    listaDeTareas.appendChild(elemento);

    tareas.push(nuevoObjetoTarea);
    guardarEnLocalStorage();
    actualizarContador();

    inputTarea.value = '';
});

btnFiltroTodas.addEventListener('click', function() {
    actualizarBotonesFiltro(btnFiltroTodas);
    renderizarTareas(tareas); 
});

btnFiltroPendientes.addEventListener('click', function() {
    actualizarBotonesFiltro(btnFiltroPendientes);
    
    
    const pendientes = tareas.filter(tarea => tarea.completada === false);
    renderizarTareas(pendientes); 
});

btnFiltroCompletadas.addEventListener('click', function() {
    actualizarBotonesFiltro(btnFiltroCompletadas);
    const completadas = tareas.filter(tarea => tarea.completada === true);
    renderizarTareas(completadas); 
});

btnLimpiar.addEventListener('click', function() {
    tareas = tareas.filter(tarea => tarea.completada === false);
    guardarEnLocalStorage();
    renderizarTareas(tareas);
    actualizarBotonesFiltro(btnFiltroTodas);
    actualizarContador();
});
