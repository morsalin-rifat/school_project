document.addEventListener('DOMContentLoaded', () => {
    const noticeBoardGrid = document.getElementById('notice-board-grid');
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeButton = document.querySelector('.close-button');

    const NOTICE_STORAGE_KEY = 'schoolNotices';

    // --- কাল্পনিক ডেটা (Dummy Data) ---
    // অ্যাডমিন প্যানেল তৈরি হওয়ার পর এই অংশটি মুছে ফেলা হবে।
    const dummyNotices = [
        {
            id: 1,
            headline: 'Annual Sports Day 2024',
            date: '2024-08-15',
            image: 'https://via.placeholder.com/600x400/8A2BE2/FFFFFF?text=Sports+Day'
        },
        {
            id: 2,
            headline: 'Science Fair Exhibition',
            date: '2024-08-10',
            image: 'https://via.placeholder.com/600x400/4169E1/FFFFFF?text=Science+Fair'
        },
        {
            id: 3,
            headline: 'Parent-Teacher Meeting',
            date: '2024-08-05',
            image: 'https://via.placeholder.com/600x400/00BFFF/FFFFFF?text=Meeting'
        },
        {
            id: 4,
            headline: 'Admission Open for 2025',
            date: '2024-08-01',
            image: 'https://via.placeholder.com/600x400/9370DB/FFFFFF?text=Admission'
        },
         {
            id: 5,
            headline: 'Art Competition Results',
            date: '2024-07-28',
            image: 'https://via.placeholder.com/600x400/6A5ACD/FFFFFF?text=Art+Results'
        },
        {
            id: 6,
            headline: 'School Picnic Announcement',
            date: '2024-07-25',
            image: 'https://via.placeholder.com/600x400/483D8B/FFFFFF?text=Picnic'
        }
    ];
    // --- কাল্পনিক ডেটা শেষ ---

    // ডেটা লোড করার ফাংশন (ভবিষ্যতে API কল দিয়ে রিপ্লেস হবে)
    const fetchNotices = () => {
        const storedNotices = JSON.parse(localStorage.getItem(NOTICE_STORAGE_KEY));
        
        // যদি localStorage-এ ডেটা থাকে, সেটা ব্যবহার করবে, নাহলে কাল্পনিক ডেটা দেখাবে
        if (storedNotices && storedNotices.length > 0) {
            return storedNotices;
        } else {
            // ডিজাইন পরীক্ষার জন্য কাল্পনিক ডেটা ব্যবহার
            return dummyNotices;
        }
    };

    // নোটিশ কার্ড তৈরি এবং পেজে যোগ করার ফাংশন
    const renderNotices = (notices) => {
        if (!noticeBoardGrid) return;
        noticeBoardGrid.innerHTML = ''; // আগের নোটিশ মুছে ফেলুন

        if (notices.length === 0) {
            noticeBoardGrid.innerHTML = '<p class="no-notices">No notices to display at the moment.</p>';
            return;
        }

        notices.forEach(notice => {
            const noticeCard = document.createElement('div');
            noticeCard.className = 'notice-card';
            noticeCard.dataset.image = notice.image; // ছবির URL ডেটাসেটে সেভ করা

            const formattedDate = new Date(notice.date).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'long', year: 'numeric'
            });

            noticeCard.innerHTML = `
                <img src="${notice.image}" alt="${notice.headline}" class="notice-card__image">
                <div class="notice-card__header">
                    <h3 class="notice-card__headline">${notice.headline}</h3>
                    <p class="notice-card__date">${formattedDate}</p>
                </div>
            `;

            // কার্ডে ক্লিক করলে modal খুলবে
            noticeCard.addEventListener('click', () => {
                modal.style.display = 'block';
                modalImage.src = notice.image;
            });

            noticeBoardGrid.appendChild(noticeCard);
        });
    };

    // Modal বন্ধ করার ফাংশন
    const closeModal = () => {
        modal.style.display = 'none';
        modalImage.src = ''; // রিসোর্স খালি করা
    };

    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) { // শুধুমাত্র বাইরের ধূসর অংশে ক্লিক করলে বন্ধ হবে
            closeModal();
        }
    });

    // ইনিশিয়ালাইজেশন
    const allNotices = fetchNotices();
    renderNotices(allNotices);
});