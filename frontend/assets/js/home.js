// assets/js/home.js

document.addEventListener('DOMContentLoaded', () => {
    const recentNoticesContainer = document.getElementById('recent-notices-container');
    const eventsContainer = document.getElementById('events-container');
    
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeButton = document.querySelector('.close-button');
    
    // --- আমাদের লাইভ API URL ---
    const NOTICES_API_URL = 'https://school-backend-4gvr.onrender.com/api/notices/';
    const MAX_RECENT_NOTICES = 5;
    
    // --- কাল্পনিক ইভেন্ট ডেটা (ভবিষ্যতে এটিও API থেকে আসবে) ---
    const dummyEvents = [
        { month: 'AUG', day: '15', title: 'Annual Sports Day', description: 'Join us for a day of fun, games, and friendly competition.' },
        { month: 'SEP', day: '05', title: 'Teachers\' Day Celebration', description: 'A special event to honor our beloved teachers.' },
        { month: 'OCT', day: '22', title: 'Annual Cultural Fest', description: 'Showcasing the diverse talents of our students.' }
    ];
    
    // --- নোটিশ লোড করার ফাংশন (API থেকে) ---
    const fetchRecentNotices = async () => {
        if (!recentNoticesContainer) return;
        // লোডিং অ্যানিমেশন বা বার্তা যোগ করা যেতে পারে
        recentNoticesContainer.innerHTML = `<p class="loading-message">Loading latest notices...</p>`;
        
        try {
            const response = await fetch(NOTICES_API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // ব্যাকএন্ড থেকে ডেটা আগে থেকেই সর্ট করা আছে
            const notices = await response.json();
            renderRecentNotices(notices);
        } catch (error) {
            console.error("Could not fetch recent notices:", error);
            recentNoticesContainer.innerHTML = `<p class="error-message">Failed to load notices.</p>`;
        }
    };
    
    // --- নোটিশ কার্ড রেন্ডার করার ফাংশন ---
    const renderRecentNotices = (notices) => {
        if (!recentNoticesContainer) return;
        recentNoticesContainer.innerHTML = '';
        
        if (!notices || notices.length === 0) {
            // কোনো নোটিশ না থাকলে দেখানোর জন্য একটি কার্ড
            recentNoticesContainer.innerHTML = `
                <div class="notice-card placeholder-card">
                    No recent notices available.
                </div>`;
            return;
        }
        
        const noticesToDisplay = notices.slice(0, MAX_RECENT_NOTICES);
        
        noticesToDisplay.forEach(notice => {
            const noticeCard = document.createElement('div');
            noticeCard.className = 'notice-card';
            noticeCard.style.minWidth = '300px';
            
            const formattedDate = new Date(notice.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
            
            noticeCard.innerHTML = `
                <img src="${notice.imageUrl}" alt="${notice.headline}" class="notice-card__image">
                <div class="notice-card__header">
                    <h3 class="notice-card__headline">${notice.headline}</h3>
                    <p class="notice-card__date">${formattedDate}</p>
                </div>
            `;
            
            noticeCard.addEventListener('click', () => {
                if (modal && modalImage) {
                    modal.style.display = 'block';
                    modalImage.src = notice.imageUrl;
                }
            });
            
            recentNoticesContainer.appendChild(noticeCard);
        });
    };
    
    // --- ইভেন্ট রেন্ডার করার ফাংশন (আপাতত ডামি ডেটা দিয়ে) ---
    const renderEvents = (events) => {
        if (!eventsContainer) return;
        eventsContainer.innerHTML = '';
        
        events.forEach(event => {
            const eventItem = document.createElement('div');
            eventItem.className = 'event-item';
            eventItem.innerHTML = `
                <div class="event-date">
                    <span class="month">${event.month}</span>
                    <span class="day">${event.day}</span>
                </div>
                <div class="event-details">
                    <h3>${event.title}</h3>
                    <p>${event.description}</p>
                </div>
            `;
            eventsContainer.appendChild(eventItem);
        });
    };
    
    // --- Modal বন্ধ করার লজিক ---
    const closeModal = () => {
        if (modal) modal.style.display = 'none';
    };
    if (closeButton) closeButton.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // --- ইনিশিয়ালাইজেশন ---
    fetchRecentNotices();
    renderEvents(dummyEvents);
});