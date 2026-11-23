import { deleteStudentsByCourse } from "./studentData.js";

export let courses = [];

loadCourses();

export function loadCourses() {
  const stored = localStorage.getItem("courses");
  if (!stored) {
    courses = [
      { courseCode: "101", courseName: "Computer Science & Engineering", category: "under-grad" },
      { courseCode: "102", courseName: "Data Science & Artificial Intelligence", category: "post-grad" },
      { courseCode: "103", courseName: "Information Technology", category: "under-grad" },
      { courseCode: "104", courseName: "Business Administration (MBA)", category: "post-grad" },
      { courseCode: "105", courseName: "Electrical & Computer Engineering", category: "under-grad" }
    ];
    saveCourses();
  } else {
    courses = JSON.parse(stored) || [];
  }
}

function saveCourses() {
  localStorage.setItem("courses", JSON.stringify(courses));
}

export function addCourse(courseCode, courseName, category) {
  courses.push({
    courseCode,
    courseName,
    category
  });

  saveCourses();
}

export function deleteCourse(courseCode) {
  let newCourses = [];

  courses.forEach((course) => {
    if (course.courseCode !== courseCode) {
      newCourses.push(course);
    }
  });

  courses = newCourses;

  saveCourses();
  deleteStudentsByCourse(courseCode);
}
