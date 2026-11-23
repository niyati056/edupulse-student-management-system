import { students, loadStudents, deleteStudent } from "../data/studentData.js";
import { courses } from "../data/courseData.js";

renderStudents(students);
updateCounts();

function renderStudents(studentList) {
    if (!studentList || studentList.length === 0) {
        document.querySelector("#table-body").innerHTML = `
            <tr>
                <td colspan="6" class="empty-table-state">
                    <div class="empty-state-content">
                        <div class="empty-state-icon">📋</div>
                        <div class="empty-state-title">No Students Found</div>
                        <div class="empty-state-sub">Try adjusting your search criteria or add a new student.</div>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    let rows = "";

    studentList.forEach((student, index) => {
        let courseName = "Unassigned";

        courses.forEach((course) => {
            if (String(course.courseCode).trim() === String(student.courseCode).trim()) {
                courseName = course.courseName;
            }
        });

        const initial = student.studentName ? student.studentName.charAt(0).toUpperCase() : "S";
        const isFemale = String(student.gender).toLowerCase() === "female";

        rows += `
        <tr>
            <td>${index + 1}</td>

            <td><span class="badge-code">${student.enrollmentNo}</span></td>

            <td>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 34px; height: 34px; border-radius: 50%; background: ${isFemale ? '#faf5ff' : '#eff6ff'}; color: ${isFemale ? '#7e22ce' : '#1d4ed8'}; font-weight: 700; font-size: 13px; display: flex; align-items: center; justify-content: center; border: 1px solid ${isFemale ? '#f3e8ff' : '#dbeafe'};">
                        ${initial}
                    </div>
                    <span style="font-weight: 600; color: #0f172a;">${student.studentName}</span>
                </div>
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
                    title="Delete Student"
                    data-enrollment="${student.enrollmentNo}">
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
            if (confirm("Are you sure you want to delete this student record?")) {
                deleteStudent(button.dataset.enrollment);
                renderStudents(students);
                updateCounts();
            }
        });
    });
}

function updateCounts() {
    let totalStudents = students.length;
    let male = 0;
    let female = 0;

    students.forEach((student) => {
        if (student.gender === "male") male++;
        if (student.gender === "female") female++;
    });

    const totalEl = document.querySelector(".stu-count");
    if (totalEl) totalEl.textContent = totalStudents;

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

    const filtered = students.filter((student) => {
        const matchesName = student.studentName.toLowerCase().includes(text) ||
                            String(student.enrollmentNo).includes(text);
        const matchesGender = gender === "" || student.gender === gender;
        return matchesName && matchesGender;
    });

    renderStudents(filtered);
}

let sortAscending = true;
const sortBtn = document.querySelector(".sorting");
if (sortBtn) {
    sortBtn.addEventListener("click", () => {
        const sorted = [...students].sort((a, b) => {
            const nameA = a.studentName.toLowerCase();
            const nameB = b.studentName.toLowerCase();
            return sortAscending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        });

        sortAscending = !sortAscending;
        renderStudents(sorted);
    });
}

window.addEventListener("storage", (event) => {
    if (event.key === "students") {
        loadStudents();
        renderStudents(students);
        updateCounts();
    }
});
