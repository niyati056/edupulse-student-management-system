// Standard Navigation & UI Interactions for EduPulse Portal
document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.querySelector(".menu-btn");
    const sidebar = document.querySelector(".left-nav-menu");
    const overlay = document.querySelector(".sidebar-overlay");
    const closeBtn = document.querySelector(".sidebar-close-btn");

    if (menuBtn && sidebar) {
        menuBtn.addEventListener("click", () => {
            sidebar.classList.toggle("show");
            if (overlay) overlay.classList.toggle("active");
        });
    }

    if (overlay) {
        overlay.addEventListener("click", () => {
            if (sidebar) sidebar.classList.remove("show");
            overlay.classList.remove("active");
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            if (sidebar) sidebar.classList.remove("show");
            if (overlay) overlay.classList.remove("active");
        });
    }

    // Set active link in sidebar based on current URL
    const currentPath = window.location.pathname.split("/").pop() || "home.html";
    const navLinks = document.querySelectorAll(".menu-items .dashboard-section");

    navLinks.forEach((link) => {
        const anchor = link.querySelector("a");
        if (anchor) {
            const href = anchor.getAttribute("href");
            if (href === currentPath || (currentPath === "" && href === "home.html")) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        }
    });

    // Display formatted current date in top navbar if placeholder exists
    const dateDisplay = document.querySelector(".js-current-date");
    if (dateDisplay) {
        const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
        dateDisplay.textContent = new Date().toLocaleDateString('en-US', options);
    }
});
