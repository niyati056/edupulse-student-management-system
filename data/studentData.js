export let students = [];

loadStudents();

export function loadStudents() {
    const stored = localStorage.getItem("students");
    if (!stored) {
        students = [
            { enrollmentNo: "20240101", studentName: "Aarav Sharma", gender: "male", courseCode: "101" },
            { enrollmentNo: "20240102", studentName: "Ananya Patel", gender: "female", courseCode: "102" },
            { enrollmentNo: "20240103", studentName: "Rohan Verma", gender: "male", courseCode: "103" },
            { enrollmentNo: "20240104", studentName: "Sneha Kulkarni", gender: "female", courseCode: "104" },
            { enrollmentNo: "20240105", studentName: "Vikram Malhotra", gender: "male", courseCode: "101" },
            { enrollmentNo: "20240106", studentName: "Priya Nair", gender: "female", courseCode: "105" }
        ];
        saveStudents();
    } else {
        students = JSON.parse(stored) || [];
    }
}

function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}

export function addStudent(enrollmentNo, studentName, gender, courseCode) {
    students.push({
        enrollmentNo,
        studentName,
        gender,
        courseCode
    });

    saveStudents();
}

export function deleteStudent(enrollmentNo) {
    let newStudents = [];

    students.forEach((student) => {
        if (student.enrollmentNo !== enrollmentNo) {
            newStudents.push(student);
        }
    });

    students = newStudents;

    saveStudents();
}

export function deleteStudentsByCourse(courseCode) {
    loadStudents();
    students = students.filter((student) => String(student.courseCode).trim() !== String(courseCode).trim());
    saveStudents();
}
