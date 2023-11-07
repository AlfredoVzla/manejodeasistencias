document.addEventListener('DOMContentLoaded', () => {
    const dropArea = document.getElementById('dropArea');
    const fileInput = document.getElementById('fileInput');
    const browseButton = document.getElementById('browseButton');

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
});
