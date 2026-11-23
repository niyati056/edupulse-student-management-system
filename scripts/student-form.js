import { courses } from "../data/courseData.js";
import { addStudent } from "../data/studentData.js";

let options = `<option value="">Select Course Program</option>`;

courses.forEach((course) => {
    options += `
        <option value="${course.courseCode}">
            ${course.courseName} (${course.courseCode})
        </option>
    `;
});

const selectEl = document.querySelector(".student-course");
if (selectEl) {
    selectEl.innerHTML = options;
}

// ---------- Submit Form ----------
const submit = document.querySelector(".submission");

if (submit) {
    submit.addEventListener("click", (event) => {
        event.preventDefault();

        const enrollmentNo = document.querySelector(".enrollment-no").value.trim();
        const studentName = document.querySelector(".student-name").value.trim();
        const gender = document.querySelector('input[name="gen"]:checked');
        const courseCode = document.querySelector(".student-course").value;

        const pattern = /^[0-9]+$/;

        if (!pattern.test(enrollmentNo)) {
            alert("Please enter a valid numeric Enrollment Number.");
            return;
        }

        if (studentName === "") {
            alert("Please enter the Student Full Name.");
            return;
        }

        if (!gender) {
            alert("Please select a Gender.");
            return;
        }

        if (courseCode === "") {
            alert("Please select a Course Program.");
            return;
        }

        addStudent(
            enrollmentNo,
            studentName,
            gender.value,
            courseCode
        );

        window.location.href = "students.html";
    });
}
