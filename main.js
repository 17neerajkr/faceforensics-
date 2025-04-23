function uploadFile() {
    const fileInput = document.getElementById("upload-file");
    const file = fileInput.files[0];
    if (!file) {
        alert("Please select a file.");
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('http://127.0.0.1:5000/detect', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("result").innerHTML = `
            <p><strong>Deepfake Detection Result:</strong> ${data.deepfake_score * 100}% Likely Deepfake</p>
            <p><strong>Suggested Action:</strong> This image is highly likely to be a deepfake. Here is the original face below:</p>
            <img src="${data.real_face}" alt="Real Face" width="200">
        `;
    })
    .catch(error => console.error('Error:', error));
}

