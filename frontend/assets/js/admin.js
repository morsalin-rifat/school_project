// assets/js/admin.js
document.addEventListener('DOMContentLoaded', () => {
    const noticeForm = document.getElementById('notice-form');
    const headlineInput = document.getElementById('headline');
    const dateInput = document.getElementById('notice-date');
    const imageInput = document.getElementById('notice-image');
    const statusMessage = document.getElementById('status-message');
    const uploadBtn = document.getElementById('upload-btn');
    
    // --- আপনার ImgBB API কী এখানে পেস্ট করুন ---
    const IMGBB_API_KEY = '867bd2bca9c9325ed6e9b4dcbd5503bf';
    
    // --- আমাদের লাইভ Django API URL ---
    const DJANGO_API_URL = 'https://school-backend-4gvr.onrender.com/api/notices/';
    
    noticeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const headline = headlineInput.value.trim();
        const date = dateInput.value;
        const imageFile = imageInput.files[0];
        
        if (!headline || !date || !imageFile) {
            showStatus('Please fill all fields.', 'error');
            return;
        }
        
        // বাটন ডিজেবল করুন এবং লোডিং টেক্সট দেখান
        uploadBtn.disabled = true;
        uploadBtn.textContent = 'Uploading... Please wait...';
        showStatus('Uploading image to ImgBB...', 'loading');
        
        // --- ধাপ ১: ImgBB-তে ছবি আপলোড ---
        const formData = new FormData();
        formData.append('image', imageFile);
        
        try {
            const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData,
            });
            
            if (!imgbbResponse.ok) {
                throw new Error('Image upload to ImgBB failed.');
            }
            
            const imgbbResult = await imgbbResponse.json();
            const imageUrl = imgbbResult.data.url;
            
            showStatus('Image uploaded! Now saving notice...', 'loading');
            
            // --- ধাপ ২: Django API-তে ডেটা পাঠানো ---
            const noticeData = {
                headline: headline,
                date: date,
                imageUrl: imageUrl,
            };
            
            const djangoResponse = await fetch(DJANGO_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(noticeData),
            });
            
            if (!djangoResponse.ok) {
                throw new Error('Failed to save notice to the server.');
            }
            
            showStatus('Notice uploaded successfully!', 'success');
            noticeForm.reset();
            
        } catch (error) {
            console.error('Upload failed:', error);
            showStatus(`Upload failed: ${error.message}`, 'error');
        } finally {
            // বাটন আবার এনাবল করুন
            uploadBtn.disabled = false;
            uploadBtn.textContent = 'Upload Notice';
        }
    });
    
    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = `status-message ${type}`; // success, error, loading
    }
});