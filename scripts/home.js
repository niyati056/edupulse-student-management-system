import { students } from "../data/studentData.js";
import { faculty } from "../data/courseFaculty.js";
import { courses } from "../data/courseData.js";

const studCountEl = document.querySelector(".stud-count");
if (studCountEl) studCountEl.textContent = students.length;

const facCountEl = document.querySelector(".fac-count");
if (facCountEl) facCountEl.textContent = faculty.length;

const couCountEl = document.querySelector(".cou-count");
if (couCountEl) couCountEl.textContent = courses.length;
