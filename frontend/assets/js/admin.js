// assets/js/admin.js (Final Version for UI)

document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selections ---
    const sidebar = document.querySelector('.sidebar');
    const toggle = document.querySelector('.toggle');
    const mainContent = document.querySelector('.main-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const innerWrapper = document.querySelector('.main-content-inner-wrapper');
    const headerTitle = document.getElementById('header-title');
    
    // --- Sidebar Toggle Functionality ---
    if (toggle && sidebar && mainContent) {
        toggle.addEventListener('click', () => {
            sidebar.classList.toggle('close');
        });
    }
    
    // --- Navigation with Sliding Effect ---
    if (navLinks.length > 0 && innerWrapper) {
        navLinks.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // 1. Update active link style
                navLinks.forEach(item => item.classList.remove('active'));
                link.classList.add('active');
                
                // 2. Calculate and apply the slide
                const slideAmount = -index * 100;
                innerWrapper.style.transform = `translateX(${slideAmount}%)`;
                
                // 3. Update the header title dynamically
                const titleText = link.querySelector('.text').textContent;
                if (headerTitle) {
                    headerTitle.textContent = titleText;
                }
            });
        });
    }
    
    // --- Placeholder for Notice Management Logic ---
    // The actual logic for notice upload, list, and delete will be added here.
    // This is just to ensure the UI is ready and bug-free.
    const noticeForm = document.getElementById('notice-form');
    if (noticeForm) {
        noticeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // This is a placeholder alert. We will replace this with our API call logic.
            const uploadStatus = document.getElementById('upload-status');
            uploadStatus.textContent = 'Notice management functionality is being implemented.';
            uploadStatus.className = 'status-message loading'; // Use 'loading' style for info
        });
    }
    
});