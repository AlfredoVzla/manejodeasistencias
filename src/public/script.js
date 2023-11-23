document.addEventListener('DOMContentLoaded', () => {
    const dropArea = document.getElementById('dropArea');
    const fileInput = document.getElementById('fileInput');
    const browseButton = document.getElementById('browseButton');
    const uploadButton = document.getElementById('uploadButton');
    const grupoInput = document.getElementById('grupoInput');
    
    browseButton.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', () => {
    
        console.log('Archivo seleccionado:', fileInput.files[0].name);
    });

    uploadButton.addEventListener('click', () => {

        if (fileInput.files.length > 0 && grupoInput.value.trim() !== '') {
            const formData = new FormData();
            formData.append('grupo', grupoInput.value.trim()); 
            formData.append('csvFile', fileInput.files[0]);
            

            const baseURL = 'http://localhost:8721';  
            fetch(`${baseURL}/asistencias/nueva`, {
              method: 'POST',
              body: formData
            })
            .then(response => {
                if (response.ok) {
                    console.log('Archivo y grupo enviado al servidor', response);
                    resetDropArea();
                    alert('¡Archivo subido correctamente!');
                } else {
                    console.error('Error al enviar el archivo y el grupo', response.statusText);
                    return response.json(); // Lee el cuerpo de la respuesta
                }
            })
            .then(data => {
                if (data && data.error) {
                    console.error('Error adicional:', data.error);
                    alert('Error al subir el archivo: ' + data.error);
                }
            })
            .catch(error => {
                console.error('Error al enviar el archivo y el grupo', error)
            });
        } else {
            console.error('Selecciona un archivo y ingresa un grupo antes de intentar subirlo.');
        }

    });

    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropArea.style.backgroundColor = '#f0f0f0';
    });

    dropArea.addEventListener('dragleave', () => {
        dropArea.style.backgroundColor = 'white';
    });

    dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        dropArea.style.backgroundColor = 'white';
        handleFile(file);
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        handleFile(file);
    });

    browseButton.addEventListener('click', () => {
        fileInput.click();
    });

    function handleFile(file) {
        dropArea.style.backgroundColor = '#f0f0f0';
        dropArea.innerHTML = '';
        const icon = document.createElement('span');
        icon.textContent = '\ud83d\udcdd';
        icon.style.fontSize = '30px';
        dropArea.appendChild(icon);
        dropArea.appendChild(document.createTextNode(file.name));
    }

    function resetDropArea() {
        grupoInput.value = '';
        dropArea.style.backgroundColor = 'white';
        dropArea.innerHTML = `
            <input type="file" id="fileInput" style="display: none">
            <button id="browseButton" class="browse-button">O selecciona un archivo</button>
            <div class="drop-text">📁 Arrastra y suelta archivos aquí</div>
        `;
        const newBrowseButton = document.getElementById('browseButton');
        newBrowseButton.addEventListener('click', () => {
            fileInput.click();
        });
    }
});