// assets/js/admin.js (Logic for Video UI)
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.menu-btn');
    const closeBtn = document.querySelector('.close-btn');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const contentWrapper = document.querySelector('.content-wrapper');
    const headerTitle = document.getElementById('header-title');
    
    // --- Sidebar Toggle Logic ---
    const toggleSidebar = () => {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    };
    
    if (menuBtn) menuBtn.addEventListener('click', toggleSidebar);
    if (closeBtn) closeBtn.addEventListener('click', toggleSidebar);
    if (overlay) overlay.addEventListener('click', toggleSidebar);
    
    // --- Page/Section Loading Logic ---
    const loadSection = (targetId) => {
        if (!contentWrapper) return;
        
        // Add fade-out animation
        contentWrapper.classList.add('fade-out');
        
        setTimeout(() => {
            const template = document.getElementById(`template-${targetId}`);
            if (template) {
                contentWrapper.innerHTML = template.innerHTML;
                // Trigger fade-in animation
                contentWrapper.classList.remove('fade-out');
                
                // Re-run any scripts needed for the new content
                initializeNoticeManagement();
            }
        }, 300); // Wait for fade-out animation to finish
    };
    
    // --- Navigation Click Handling ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
            
            const targetId = link.dataset.target;
            const titleText = link.querySelector('.text').textContent;
            
            if (headerTitle) headerTitle.textContent = titleText;
            
            loadSection(targetId);
            toggleSidebar(); // Close sidebar after selection
        });
    });
    
    // --- Initialize Page ---
    // Load the default section on page load
    loadSection('dashboard-overview');
    
    // --- Notice Management Logic (will be initialized after content load) ---
    function initializeNoticeManagement() {
        const noticeForm = document.getElementById('notice-form');
        if (noticeForm) {
            // Placeholder for form submission
            noticeForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Notice upload functionality is being implemented.');
            });
            
            // Placeholder for loading existing notices
            const noticeList = document.getElementById('existing-notices-list');
            if (noticeList) {
                // This is where we will fetch and display notices
            }
        }
    }
});