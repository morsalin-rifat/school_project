window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('recent-notices');
    if(!container) return;

    let storedNotices = JSON.parse(localStorage.getItem('notices') || "[]");
    let recent = storedNotices.slice(-3).reverse(); // last 3
    container.innerHTML = "";

    recent.forEach(notice => {
        const div = document.createElement('div');
        div.className = 'notice-frame';
        div.innerHTML = `<img src="${notice.img}" alt="${notice.title}"><h3>${notice.title}</h3><p>${notice.date}</p>`;
        div.addEventListener('click', () => openModal(notice.img));
        container.appendChild(div);
    });

    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.innerHTML = `<img id="modal-img" src="" alt="Notice">`;
    modal.addEventListener('click', () => { modal.style.display='none'; });
    document.body.appendChild(modal);

    function openModal(src) {
        modal.style.display='flex';
        document.getElementById('modal-img').src = src;
    }
});
