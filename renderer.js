document.getElementById('button').addEventListener('click', () => {
    valueSelected = document.getElementById('format').selectedOptions[0].value;
    window.electronAPI.openDialog();
})