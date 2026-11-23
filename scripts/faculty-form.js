import { courses } from "../data/courseData.js";
import { addFaculty } from "../data/courseFaculty.js";

let options = `<option value="">Select Course Department</option>`;

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

const submit = document.querySelector(".submission");

if (submit) {
    submit.addEventListener("click", (event) => {
        event.preventDefault();

        const facultyName = document.querySelector(".enrollment-no").value.trim();
        const email = document.querySelector(".student-name").value.trim();
        const gender = document.querySelector('input[name="gen"]:checked');
        const courseCode = document.querySelector(".student-course").value;

        if (facultyName === "") {
            alert("Please enter the Faculty Full Name.");
            return;
        }

        if (email === "") {
            alert("Please enter an Email Address.");
            return;
        }

        if (!gender) {
            alert("Please select a Gender.");
            return;
        }

        if (courseCode === "") {
            alert("Please select an Assigned Course.");
            return;
        }

        addFaculty(
            facultyName,
            email,
            gender.value,
            courseCode
        );

        window.location.href = "faculty.html";
    });
}
