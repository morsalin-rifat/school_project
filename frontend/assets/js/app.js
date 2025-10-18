console.log("App JS loaded - Home Page");

// Sample notices (later Firebase integration)
const notices = [
    { title: "Math Exam", date: "2025-10-20", img: "images/pdf_icon.png" },
    { title: "Science Fair", date: "2025-10-18", img: "images/pdf_icon.png" },
];

// Function to display notices
function displayPreviewNotices() {
    const container = document.getElementById("preview-notices");
    container.innerHTML = "";
    notices.forEach(notice => {
        const div = document.createElement("div");
        div.className = "notice-frame";
        div.innerHTML = `
            <img src="${notice.img}" alt="${notice.title}" style="width:150px;height:150px;">
            <h3>${notice.title}</h3>
            <p>${notice.date}</p>
        `;
        container.appendChild(div);
    });
}

// Call function
displayPreviewNotices();
