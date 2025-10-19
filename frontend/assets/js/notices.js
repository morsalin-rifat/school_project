// assets/js/notices.js

document.addEventListener('DOMContentLoaded', () => {
    const noticeBoardGrid = document.getElementById('notice-board-grid');
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeButton = document.querySelector('.close-button');

    // --- আমাদের নতুন লাইভ API URL ---
    const API_URL = 'https://school-backend-4gvr.onrender.com/api/notices/';

    // --- ডেটা লোড করার নতুন ফাংশন (API থেকে) ---
    const fetchNotices = async () => {
        // ডেটা লোড হওয়ার সময় একটি লোডিং বার্তা দেখানো যেতে পারে
        if (noticeBoardGrid) {
            noticeBoardGrid.innerHTML = '<p class="loading-message">Loading notices...</p>';
        }

        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const notices = await response.json();
            return notices;
        } catch (error) {
            console.error("Could not fetch notices:", error);
            // Error হলে একটি বার্তা দেখানো
            if (noticeBoardGrid) {
                noticeBoardGrid.innerHTML = '<p class="error-message">Failed to load notices. Please try again later.</p>';
            }
            return []; // খালি অ্যারে রিটার্ন করা
        }
    };

    // --- নোটিশ কার্ড তৈরি এবং পেজে যোগ করার ফাংশন (আগের মতোই) ---
    const renderNotices = (notices) => {
        if (!noticeBoardGrid) return;
        noticeBoardGrid.innerHTML = ''; // লোডিং বার্তা মুছে ফেলুন

        if (!notices || notices.length === 0) {
            noticeBoardGrid.innerHTML = '<p class="no-notices-message">No notices to display at the moment.</p>';
            return;
        }
        
        // নতুন নোটিশগুলো আগে দেখানোর জন্য ডেটা সর্ট করা (ঐচ্ছিক)
        notices.sort((a, b) => new Date(b.date) - new Date(a.date));

        notices.forEach(notice => {
            const noticeCard = document.createElement('div');
            noticeCard.className = 'notice-card';

            // Firebase থেকে আসা ফিল্ডের নামগুলো ব্যবহার করা হচ্ছে (imageUrl, headline, date)
            const imageUrl = notice.imageUrl || 'https://via.placeholder.com/600x400/CCCCCC/FFFFFF?text=No+Image';
            const headline = notice.headline || 'No Title';
            const date = notice.date || '';

            const formattedDate = new Date(date).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'long', year: 'numeric'
            });

            noticeCard.innerHTML = `
                <img src="${imageUrl}" alt="${headline}" class="notice-card__image">
                <div class="notice-card__header">
                    <h3 class="notice-card__headline">${headline}</h3>
                    <p class="notice-card__date">${formattedDate}</p>
                </div>
            `;

            // কার্ডে ক্লিক করলে modal খুলবে
            noticeCard.addEventListener('click', () => {
                if (modal && modalImage) {
                    modal.style.display = 'block';
                    modalImage.src = imageUrl;
                }
            });

            noticeBoardGrid.appendChild(noticeCard);
        });
    };

    // --- Modal বন্ধ করার ফাংশন (আগের মতোই) ---
    const closeModal = () => {
        if (modal) {
            modal.style.display = 'none';
            modalImage.src = '';
        }
    };

    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // --- ইনিশিয়ালাইজেশন: API থেকে ডেটা এনে পেজ রেন্ডার করা ---
    const initializePage = async () => {
        const noticesData = await fetchNotices();
        renderNotices(noticesData);
    };

    initializePage();
});