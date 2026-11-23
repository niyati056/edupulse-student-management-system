import { courses, deleteCourse } from "../data/courseData.js";

renderCourses(courses);
updateCounts();

function renderCourses(courseList) {
    if (!courseList || courseList.length === 0) {
        document.querySelector("#table-body").innerHTML = `
            <tr>
                <td colspan="5" class="empty-table-state">
                    <div class="empty-state-content">
                        <div class="empty-state-icon">📚</div>
                        <div class="empty-state-title">No Courses Found</div>
                        <div class="empty-state-sub">Try adjusting your search criteria or add a new course.</div>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    let rows = "";
    courseList.forEach((course, index) => {
        const isPostGrad = course.category === "post-grad";

        rows += `
        <tr>
            <td>${index + 1}</td>
            <td><span class="badge-code">${course.courseCode}</span></td>
            <td>
                <span style="font-weight: 600; color: #0f172a;">${course.courseName}</span>
            </td>
            <td>
                <span class="${isPostGrad ? 'badge-postgrad' : 'badge-undergrad'}">
                    ${isPostGrad ? 'Post-Graduate' : 'Under-Graduate'}
                </span>
            </td>
            <td style="text-align: center;">
                <button
                    class="delete-btn"
                    title="Delete Course"
                    data-course-code="${course.courseCode}">
                    <img src="images/delete.svg" alt="Delete">
                </button>
            </td>
        </tr>`;
    });

    document.querySelector("#table-body").innerHTML = rows;
    addDeleteEvents();
}

function addDeleteEvents() {
    document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", () => {
            if (confirm("Deleting this course will also remove student enrollments for this course. Proceed?")) {
                deleteCourse(button.dataset.courseCode);
                renderCourses(courses);
                updateCounts();
            }
        });
    });
}

function updateCounts() {
    let totalCourses = courses.length;
    let underGrad = 0;
    let postGrad = 0;

    courses.forEach((course) => {
        if (course.category === "under-grad") underGrad++;
        if (course.category === "post-grad") postGrad++;
    });

    const totalEl = document.querySelector(".js-total-courses");
    if (totalEl) totalEl.textContent = totalCourses;

    const underEl = document.querySelector(".js-under-grad");
    if (underEl) underEl.textContent = underGrad;

    const postEl = document.querySelector(".js-post-grad");
    if (postEl) postEl.textContent = postGrad;
}

const search = document.querySelector(".search-bar-course");
if (search) {
    search.addEventListener("input", applyFilters);
}

const categorySelect = document.querySelector(".course-type");
if (categorySelect) {
    categorySelect.addEventListener("change", applyFilters);
}

function applyFilters() {
    const text = search ? search.value.toLowerCase().trim() : "";
    const value = categorySelect ? categorySelect.value : "";

    const filtered = courses.filter((course) => {
        const matchesName = course.courseName.toLowerCase().includes(text) ||
                            String(course.courseCode).toLowerCase().includes(text);
        let matchesCategory = true;
        if (value === "under") {
            matchesCategory = course.category === "under-grad";
        } else if (value === "post") {
            matchesCategory = course.category === "post-grad";
        }
        return matchesName && matchesCategory;
    });

    renderCourses(filtered);
}

let sortAscending = true;
const sortBtn = document.querySelector(".sorting");
if (sortBtn) {
    sortBtn.addEventListener("click", () => {
        const sorted = [...courses].sort((a, b) => {
            const nameA = a.courseName.toLowerCase();
            const nameB = b.courseName.toLowerCase();
            return sortAscending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        });

        sortAscending = !sortAscending;
        renderCourses(sorted);
    });
}
