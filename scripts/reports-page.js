import { students } from "../data/studentData.js";
import { faculty } from "../data/courseFaculty.js";
import { courses } from "../data/courseData.js";

renderAnalytics();

export function renderAnalytics() {
    // 1. Core Summary Metrics
    const totalStudents = students.length;
    const totalFaculty = faculty.length;
    const totalCourses = courses.length;
    const ratio = totalFaculty > 0 ? (totalStudents / totalFaculty).toFixed(1) : "0";

    const totalStudentsEl = document.querySelector(".js-rep-students");
    if (totalStudentsEl) totalStudentsEl.textContent = totalStudents;

    const totalFacultyEl = document.querySelector(".js-rep-faculty");
    if (totalFacultyEl) totalFacultyEl.textContent = totalFaculty;

    const totalCoursesEl = document.querySelector(".js-rep-courses");
    if (totalCoursesEl) totalCoursesEl.textContent = totalCourses;

    const ratioEl = document.querySelector(".js-rep-ratio");
    if (ratioEl) ratioEl.textContent = `${ratio} : 1`;

    // 2. Student Gender Distribution
    let stuMale = 0;
    let stuFemale = 0;
    students.forEach((s) => {
        if (s.gender === "male") stuMale++;
        if (s.gender === "female") stuFemale++;
    });

    const stuMalePct = totalStudents > 0 ? Math.round((stuMale / totalStudents) * 100) : 0;
    const stuFemalePct = totalStudents > 0 ? 100 - stuMalePct : 0;

    const stuMaleCountEl = document.querySelector(".js-stu-male-count");
    if (stuMaleCountEl) stuMaleCountEl.textContent = `${stuMale} (${stuMalePct}%)`;

    const stuFemaleCountEl = document.querySelector(".js-stu-female-count");
    if (stuFemaleCountEl) stuFemaleCountEl.textContent = `${stuFemale} (${stuFemalePct}%)`;

    const stuMaleBar = document.querySelector(".js-stu-male-bar");
    if (stuMaleBar) stuMaleBar.style.width = `${stuMalePct}%`;

    const stuFemaleBar = document.querySelector(".js-stu-female-bar");
    if (stuFemaleBar) stuFemaleBar.style.width = `${stuFemalePct}%`;

    // 3. Faculty Gender Distribution
    let facMale = 0;
    let facFemale = 0;
    faculty.forEach((f) => {
        if (f.gender === "male") facMale++;
        if (f.gender === "female") facFemale++;
    });

    const facMalePct = totalFaculty > 0 ? Math.round((facMale / totalFaculty) * 100) : 0;
    const facFemalePct = totalFaculty > 0 ? 100 - facMalePct : 0;

    const facMaleCountEl = document.querySelector(".js-fac-male-count");
    if (facMaleCountEl) facMaleCountEl.textContent = `${facMale} (${facMalePct}%)`;

    const facFemaleCountEl = document.querySelector(".js-fac-female-count");
    if (facFemaleCountEl) facFemaleCountEl.textContent = `${facFemale} (${facFemalePct}%)`;

    const facMaleBar = document.querySelector(".js-fac-male-bar");
    if (facMaleBar) facMaleBar.style.width = `${facMalePct}%`;

    const facFemaleBar = document.querySelector(".js-fac-female-bar");
    if (facFemaleBar) facFemaleBar.style.width = `${facFemalePct}%`;

    // 4. Course Program Types (Undergrad vs Postgrad)
    let underGrad = 0;
    let postGrad = 0;
    courses.forEach((c) => {
        if (c.category === "under-grad") underGrad++;
        if (c.category === "post-grad") postGrad++;
    });

    const underGradPct = totalCourses > 0 ? Math.round((underGrad / totalCourses) * 100) : 0;
    const postGradPct = totalCourses > 0 ? 100 - underGradPct : 0;

    const underCountEl = document.querySelector(".js-course-under-count");
    if (underCountEl) underCountEl.textContent = `${underGrad} (${underGradPct}%)`;

    const postCountEl = document.querySelector(".js-course-post-count");
    if (postCountEl) postCountEl.textContent = `${postGrad} (${postGradPct}%)`;

    const underBar = document.querySelector(".js-course-under-bar");
    if (underBar) underBar.style.width = `${underGradPct}%`;

    const postBar = document.querySelector(".js-course-post-bar");
    if (postBar) postBar.style.width = `${postGradPct}%`;

    // 5. Enrollment by Course Breakdown
    const distContainer = document.querySelector(".js-course-distribution");
    if (distContainer) {
        if (courses.length === 0) {
            distContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 13.5px;">No active courses registered.</p>`;
        } else {
            let distHtml = "";
            courses.forEach((course) => {
                const enrolled = students.filter(
                    (s) => String(s.courseCode).trim() === String(course.courseCode).trim()
                ).length;

                distHtml += `
                    <div class="course-dist-item">
                        <div class="course-dist-info">
                            <span class="course-dist-name">${course.courseName}</span>
                            <span class="course-dist-code">Code: ${course.courseCode} · ${course.category === "post-grad" ? "Post-Graduate" : "Under-Graduate"}</span>
                        </div>
                        <span class="course-dist-badge">${enrolled} ${enrolled === 1 ? 'Student' : 'Students'}</span>
                    </div>
                `;
            });
            distContainer.innerHTML = distHtml;
        }
    }
}

// Print Report action
const printBtn = document.querySelector(".js-print-report");
if (printBtn) {
    printBtn.addEventListener("click", () => {
        window.print();
    });
}
