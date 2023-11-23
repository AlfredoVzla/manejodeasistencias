document.addEventListener('DOMContentLoaded', function () {

    const filterInput = document.querySelector('.filter-input');
    const filterTypeSelect = document.getElementById('filterType');
    const globalFilter = document.getElementById('globalFilter');
    const groupFilter = document.getElementById('groupSearch');
    const fechaDesdeInput = document.getElementById('fechaDesde');
    const fechaHastaInput = document.getElementById('fechaHasta');
    const fileContent = document.getElementById('fileContent'); 

    const serverURL = "http://localhost:8721/consultas/grupo";
    const serverURLAlumno = "http://localhost:8721/consultas/alumno";

    function formatearFecha(fechaConFormatoDDMMYYYY) {
        const fechaObj = new Date(fechaConFormatoDDMMYYYY);
        return fechaObj.toLocaleDateString('en-CA'); 
    }

    let paginaActual = 1;
    const asistenciasPorPagina = 4;

    function mostrarAsistenciasPaginadas(asistencias, pagina) {
        const inicio = (pagina - 1) * asistenciasPorPagina;
        const fin = inicio + asistenciasPorPagina;
        const asistenciasPaginadas = asistencias.slice(inicio, fin);

        const asistenciasElement = document.createElement('ul');
        asistenciasElement.classList.add('asistencias-list');

        asistenciasPaginadas.forEach(asistencia => {
            const asistenciaItem = document.createElement('li');
            asistenciaItem.innerHTML = `
                <div class="asistencia-item">
                    <p><strong>Estudiante:</strong> ${asistencia.nombreEstudiante}</p>
                    <p><strong>Llegada:</strong> ${asistencia.horaAsistencia ? asistencia.horaAsistencia.llegada : 'No disponible'}</p>
                    <p><strong>Duración:</strong> ${asistencia.horaAsistencia ? asistencia.horaAsistencia.duracion : 'No disponible'}</p>
                    <p><strong>Salida:</strong> ${asistencia.horaAsistencia ? asistencia.horaAsistencia.salida : 'No disponible'}</p>
                </div>
            `;
            asistenciasElement.appendChild(asistenciaItem);
        });

        return asistenciasElement;
    }

    function mostrarAsistenciasEstudiantes(asistencias, pagina, asistenciasPorPagina) {
        const inicio = (pagina - 1) * asistenciasPorPagina;
        const fin = inicio + asistenciasPorPagina;
        const asistenciasPaginadas = asistencias.slice(inicio, fin);

        const asistenciasElement = document.createElement('ul');
        asistenciasElement.classList.add('asistencias-list');

        asistenciasPaginadas.forEach(asistencia => {
            const asistenciaItem = document.createElement('li');
            asistenciaItem.innerHTML = `
                <div class="asistencia-item">
                    <p><strong>Fecha:</strong> ${asistencia.fecha}</p>
                    <p><strong>Asistió:</strong> ${asistencia.asistio ? 'Sí' : 'No'}</p>
                </div>
            `;
            asistenciasElement.appendChild(asistenciaItem);
        });

        return asistenciasElement;
    }


    function mostrarPaginacion(totalAsistencias) {
        const totalPaginas = Math.ceil(totalAsistencias / asistenciasPorPagina);
        const paginacionElement = document.createElement('div');
        paginacionElement.classList.add('pagination');

        for (let i = 1; i <= totalPaginas; i++) {
            const paginaItem = document.createElement('span');
            paginaItem.textContent = i;
            paginaItem.classList.add('page-item');

            if (i === paginaActual) {
                paginaItem.classList.add('active');
            }

            paginaItem.addEventListener('click', function () {
                paginaActual = i;
                fetchFromServer();
            });

            paginacionElement.appendChild(paginaItem);
        }

        return paginacionElement;
    }


    function fetchFromServer() {
        const filterTypeSelect = document.getElementById('filterType');

        if (filterTypeSelect.value === 'group') {
            const requestData = {
                grupo: globalFilter.value,
                desde: formatearFecha(fechaDesdeInput.value),
                hasta: formatearFecha(fechaHastaInput.value)
            };

            console.log(requestData);

            const requestOption = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            };

            fileContent.innerHTML = '';

            fetch(serverURL, requestOption)
                .then(response => response.json())
                .then(data => {
                    const asistenciasArray = (data && data[0] && data[0].fechas && data[0].fechas[0] && data[0].fechas[0].asistencias) || [];

                    fileContent.innerHTML = '';

                    if (asistenciasArray.length > 0) {
                        const asistenciasElement = mostrarAsistenciasPaginadas(asistenciasArray, paginaActual);
                        fileContent.appendChild(asistenciasElement);

                        const paginacionElement = mostrarPaginacion(asistenciasArray.length);
                        fileContent.appendChild(paginacionElement);
                    } else {
                        fileContent.innerHTML = 'No se encontraron datos.';
                    }
                })
                .catch(error => {
                    console.error('Error al realizar la solicitud:', error);
                });
        }
        if (filterTypeSelect.value === 'student') {
            const requestData = {
                alumno: globalFilter.value,
                grupo: groupFilter.value
            };

            console.log(requestData);

            const requestOption = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            };

            fileContent.innerHTML = '';

            fetch(serverURLAlumno, requestOption)
                .then(response => response.json())
                .then(data => {
                    fileContent.innerHTML = '';

                    if (data.length > 0) {
                        const asistenciasElement = mostrarAsistenciasEstudiantes(data, paginaActual, asistenciasPorPagina);
                        fileContent.appendChild(asistenciasElement);
                        const paginacionElement = mostrarPaginacion(data.length, paginaActual, asistenciasPorPagina);
                        fileContent.appendChild(paginacionElement);
                    } else {
                        fileContent.innerHTML = 'No se encontraron datos.';
                    }
                })
                .catch(error => {
                    console.error('Error al realizar la solicitud:', error);
                });
        }
    }

    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', function () {
        fetchFromServer();
    });
});
