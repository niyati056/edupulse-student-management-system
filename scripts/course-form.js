import { addCourse } from "../data/courseData.js";

const submit = document.querySelector(".submission");

if (submit) {
    submit.addEventListener("click", (event) => {
        event.preventDefault();

        const courseCode = document.querySelector(".course-code").value.trim();
        const courseName = document.querySelector(".course-name").value.trim();
        const category = document.querySelector('input[name="grad"]:checked');

        const pattern = /^[0-9]+$/;

        if (!pattern.test(courseCode)) {
            alert("Please enter a valid numeric Course Code.");
            return;
        }

        if (courseName === "") {
            alert("Please enter a Course Name.");
            return;
        }

        if (!category) {
            alert("Please select an Academic Degree Level.");
            return;
        }

        addCourse(
            courseCode,
            courseName,
            category.value
        );

        window.location.href = "courses.html";
    });
}
