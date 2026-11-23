import { faculty, deleteFaculty } from "../data/courseFaculty.js";
import { courses } from "../data/courseData.js";

renderFaculty(faculty);
updateCounts();

function renderFaculty(facultyList) {
    if (!facultyList || facultyList.length === 0) {
        document.querySelector("#table-body").innerHTML = `
            <tr>
                <td colspan="6" class="empty-table-state">
                    <div class="empty-state-content">
                        <div class="empty-state-icon">👨‍🏫</div>
                        <div class="empty-state-title">No Faculty Found</div>
                        <div class="empty-state-sub">Try adjusting your search criteria or add a new faculty member.</div>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    let rows = "";

    facultyList.forEach((facultyMember, index) => {
        let courseName = "Unassigned";

        courses.forEach((course) => {
            if (String(course.courseCode).trim() === String(facultyMember.courseCode).trim()) {
                courseName = course.courseName;
            }
        });

        const initial = facultyMember.facultyName ? facultyMember.facultyName.charAt(0).toUpperCase() : "F";
        const isFemale = String(facultyMember.gender).toLowerCase() === "female";

        rows += `
        <tr>
            <td>${index + 1}</td>

            <td>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 34px; height: 34px; border-radius: 50%; background: ${isFemale ? '#faf5ff' : '#ecfdf5'}; color: ${isFemale ? '#7e22ce' : '#059669'}; font-weight: 700; font-size: 13px; display: flex; align-items: center; justify-content: center; border: 1px solid ${isFemale ? '#f3e8ff' : '#d1fae5'};">
                        ${initial}
                    </div>
                    <span style="font-weight: 600; color: #0f172a;">${facultyMember.facultyName}</span>
                </div>
            </td>

            <td>
                <a href="mailto:${facultyMember.email}" style="color: #2563eb; text-decoration: none; font-weight: 500;">
                    ${facultyMember.email}
                </a>
            </td>

            <td>
                <span class="${isFemale ? 'badge-gender-female' : 'badge-gender-male'}">
                    ${isFemale ? '♀ Female' : '♂ Male'}
                </span>
            </td>

            <td>
                <span style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; background: #f1f5f9; border-radius: 6px; font-size: 13px; font-weight: 500; color: #334155;">
                    ${courseName}
                </span>
            </td>

            <td style="text-align: center;">
                <button
                    class="delete-btn"
                    title="Delete Faculty"
                    data-email="${facultyMember.email}">
                    <img src="images/delete.svg" alt="Delete">
                </button>
            </td>
        </tr>
        `;
    });

    document.querySelector("#table-body").innerHTML = rows;
    addDeleteEvents();
}

function addDeleteEvents() {
    document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this faculty member?")) {
                deleteFaculty(button.dataset.email);
                renderFaculty(faculty);
                updateCounts();
            }
        });
    });
}

function updateCounts() {
    let totalFaculty = faculty.length;
    let male = 0;
    let female = 0;

    faculty.forEach((facultyMember) => {
        if (facultyMember.gender === "male") male++;
        if (facultyMember.gender === "female") female++;
    });

    const totalEl = document.querySelector(".stu-count");
    if (totalEl) totalEl.textContent = totalFaculty;

    const maleEl = document.querySelector(".stu-count-male");
    if (maleEl) maleEl.textContent = male;

    const femaleEl = document.querySelector(".stu-count-female");
    if (femaleEl) femaleEl.textContent = female;
}

const search = document.querySelector(".search-bar-student");
if (search) {
    search.addEventListener("input", applyFilters);
}

const genderSelect = document.querySelector(".student-gender");
if (genderSelect) {
    genderSelect.addEventListener("change", applyFilters);
}

function applyFilters() {
    const text = search ? search.value.toLowerCase().trim() : "";
    const gender = genderSelect ? genderSelect.value : "";

    const filtered = faculty.filter((facultyMember) => {
        const matchesName = facultyMember.facultyName.toLowerCase().includes(text) ||
            facultyMember.email.toLowerCase().includes(text);
        const matchesGender = gender === "" || facultyMember.gender === gender;
        return matchesName && matchesGender;
    });

    renderFaculty(filtered);
}

let sortAscending = true;
const sortBtn = document.querySelector(".sorting");
if (sortBtn) {
    sortBtn.addEventListener("click", () => {
        const sorted = [...faculty].sort((a, b) => {
            const nameA = a.facultyName.toLowerCase();
            const nameB = b.facultyName.toLowerCase();
            return sortAscending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        });

        sortAscending = !sortAscending;
        renderFaculty(sorted);
    });
}
