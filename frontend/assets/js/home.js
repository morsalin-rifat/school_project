document.addEventListener('DOMContentLoaded', () => {
    const recentNoticesContainer = document.getElementById('recent-notices-container');
    const eventsContainer = document.getElementById('events-container');
    
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeButton = document.querySelector('.close-button');
    
    const NOTICE_STORAGE_KEY = 'schoolNotices';
    const MAX_RECENT_NOTICES = 5;
    
    // --- কাল্পনিক ডেটা (Dummy Data) ---
    // এই ডেটাগুলো ডিজাইন পরীক্ষার জন্য। অ্যাডমিন প্যানেল তৈরি হলে এগুলো আর দরকার হবে না।
    const dummyNotices = [
        { id: 1, headline: 'Annual Sports Day 2024', date: '2024-08-15', image: 'https://via.placeholder.com/600x400/8A2BE2/FFFFFF?text=Sports+Day' },
        { id: 2, headline: 'Science Fair Exhibition', date: '2024-08-10', image: 'https://via.placeholder.com/600x400/4169E1/FFFFFF?text=Science+Fair' },
        { id: 3, headline: 'Parent-Teacher Meeting', date: '2024-08-05', image: 'https://via.placeholder.com/600x400/00BFFF/FFFFFF?text=Meeting' },
        { id: 4, headline: 'Admission Open for 2025', date: '2024-08-01', image: 'https://via.placeholder.com/600x400/9370DB/FFFFFF?text=Admission' },
        { id: 5, headline: 'Art Competition Results', date: '2024-07-28', image: 'https://via.placeholder.com/600x400/6A5ACD/FFFFFF?text=Art+Results' }
    ];
    
    const dummyEvents = [
        { month: 'AUG', day: '15', title: 'Annual Sports Day', description: 'Join us for a day of fun, games, and friendly competition.' },
        { month: 'SEP', day: '05', title: 'Teachers\' Day Celebration', description: 'A special event to honor our beloved teachers.' },
        { month: 'OCT', day: '22', title: 'Annual Cultural Fest', description: 'Showcasing the diverse talents of our students.' }
    ];
    // --- কাল্পনিক ডেটা শেষ ---
    
    // নোটিশ লোড করার ফাংশন
    const fetchNotices = () => {
        const storedNotices = JSON.parse(localStorage.getItem(NOTICE_STORAGE_KEY));
        return (storedNotices && storedNotices.length > 0) ? storedNotices : dummyNotices;
    };
    
    // নোটিশ কার্ড রেন্ডার করার ফাংশন
    const renderRecentNotices = (notices) => {
        if (!recentNoticesContainer) return;
        recentNoticesContainer.innerHTML = '';
        
        const noticesToDisplay = notices.slice(0, MAX_RECENT_NOTICES);
        
        noticesToDisplay.forEach(notice => {
            const noticeCard = document.createElement('div');
            noticeCard.className = 'notice-card';
            noticeCard.style.minWidth = '300px'; // Set a min-width for horizontal scroll items
            
            const formattedDate = new Date(notice.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
            
            noticeCard.innerHTML = `
                <img src="${notice.image}" alt="${notice.headline}" class="notice-card__image">
                <div class="notice-card__header">
                    <h3 class="notice-card__headline">${notice.headline}</h3>
                    <p class="notice-card__date">${formattedDate}</p>
                </div>
            `;
            
            noticeCard.addEventListener('click', () => {
                modal.style.display = 'block';
                modalImage.src = notice.image;
            });
            
            recentNoticesContainer.appendChild(noticeCard);
        });
    };
    
    // ইভেন্ট রেন্ডার করার ফাংশন
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
    
    // Modal বন্ধ করার লজিক
    const closeModal = () => {
        modal.style.display = 'none';
        modalImage.src = '';
    };
    
    if (modal) {
        closeButton.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // ইনিশিয়ালাইজেশন
    const allNotices = fetchNotices();
    renderRecentNotices(allNotices);
    renderEvents(dummyEvents);
});