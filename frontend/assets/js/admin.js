const uploadForm = document.getElementById('upload-form');
const status = document.getElementById('upload-status');

uploadForm.addEventListener('submit', function(e){
    e.preventDefault();

    const fileInput = document.getElementById('notice-file');
    const title = document.getElementById('notice-title').value;
    const date = document.getElementById('notice-date').value;

    if(fileInput.files.length === 0) {
        status.textContent = "Please select an image.";
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const imageUrl = e.target.result;

        let storedNotices = JSON.parse(localStorage.getItem('notices') || "[]");
        storedNotices.push({ title, date, img: imageUrl });
        localStorage.setItem('notices', JSON.stringify(storedNotices));

        status.textContent = "Notice uploaded successfully!";
        uploadForm.reset();
    }

    reader.readAsDataURL(file);
});
