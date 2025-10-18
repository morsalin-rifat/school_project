window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById("notice-board");
    if(!container) return;

    let storedNotices = JSON.parse(localStorage.getItem('notices') || "[]");
    container.innerHTML = "";

    storedNotices.forEach(notice => {
        const div = document.createElement("div");
        div.className = "notice-frame";
        div.innerHTML = `
            <img src="${notice.img}" alt="${notice.title}">
            <h3>${notice.title}</h3>
            <p>${notice.date}</p>
        `;
        container.appendChild(div);
    });
});
