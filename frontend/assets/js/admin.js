document.addEventListener('DOMContentLoaded', () => {
    const noticeForm = document.getElementById('notice-form');
    const headlineInput = document.getElementById('headline');
    const dateInput = document.getElementById('notice-date');
    const imageInput = document.getElementById('notice-image');
    const statusMessage = document.getElementById('status-message');
    const adminNoticeList = document.getElementById('admin-notice-list');
    
    const NOTICE_STORAGE_KEY = 'schoolNotices';
    
    // ডেটা লোড করার ফাংশন (ভবিষ্যতে API কল দিয়ে রিপ্লেস হবে)
    const getNotices = () => {
        return JSON.parse(localStorage.getItem(NOTICE_STORAGE_KEY)) || [];
    };
    
    // ডেটা সেভ করার ফাংশন (ভবিষ্যতে API কল দিয়ে রিপ্লেস হবে)
    const saveNotices = (notices) => {
        localStorage.setItem(NOTICE_STORAGE_KEY, JSON.stringify(notices));
    };
    
    // ছবিকে Base64 স্ট্রিং-এ রূপান্তর করার ফাংশন
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    
    // অ্যাডমিন পেজে বিদ্যমান নোটিশ দেখানোর ফাংশন
    const displayAdminNotices = () => {
        const notices = getNotices();
        adminNoticeList.innerHTML = ''; // তালিকা পরিষ্কার করুন
        if (notices.length === 0) {
            adminNoticeList.innerHTML = '<p style="color: #fff; text-align: center; grid-column: 1 / -1;">No notices found.</p>';
            return;
        }
        
        notices.forEach(notice => {
            const noticeEl = document.createElement('div');
            noticeEl.className = 'admin-notice-item';
            noticeEl.innerHTML = `
                <img src="${notice.image}" alt="Notice thumbnail">
                <p>${notice.headline}</p>
            `;
            adminNoticeList.appendChild(noticeEl);
        });
    };
    
    // ফর্ম সাবমিট হ্যান্ডেল করার ফাংশন
    noticeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const headline = headlineInput.value.trim();
        const date = dateInput.value;
        const imageFile = imageInput.files[0];
        
        if (!headline || !date || !imageFile) {
            statusMessage.textContent = 'Please fill all fields.';
            statusMessage.style.color = 'red';
            return;
        }
        
        statusMessage.textContent = 'Uploading...';
        statusMessage.style.color = 'white';
        
        try {
            const imageBase64 = await toBase64(imageFile);
            
            const newNotice = {
                id: Date.now(),
                headline: headline,
                date: date,
                image: imageBase64
            };
            
            const notices = getNotices();
            notices.unshift(newNotice); // নতুন নোটিশ প্রথমে যোগ হবে
            saveNotices(notices);
            
            statusMessage.textContent = 'Notice uploaded successfully!';
            statusMessage.style.color = 'lightgreen';
            noticeForm.reset();
            
            displayAdminNotices(); // তালিকা রিফ্রেশ করুন
            
            setTimeout(() => {
                statusMessage.textContent = '';
            }, 3000);
            
        } catch (error) {
            console.error('Error processing image:', error);
            statusMessage.textContent = 'Failed to upload image. Please try again.';
            statusMessage.style.color = 'red';
        }
    });
    
    // পেজ লোড হওয়ার সাথে সাথে বিদ্যমান নোটিশগুলো দেখান
    displayAdminNotices();
});