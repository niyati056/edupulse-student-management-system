export let faculty = [];

loadFaculty();

export function loadFaculty() {
    const stored = localStorage.getItem("faculty");
    if (!stored) {
        faculty = [
            { facultyName: "Dr. Rajesh Iyer", email: "rajesh.iyer@university.edu", gender: "male", courseCode: "101" },
            { facultyName: "Prof. Sunita Rao", email: "sunita.rao@university.edu", gender: "female", courseCode: "102" },
            { facultyName: "Dr. Amit Mehra", email: "amit.mehra@university.edu", gender: "male", courseCode: "103" },
            { facultyName: "Prof. Kavita Desai", email: "kavita.desai@university.edu", gender: "female", courseCode: "104" }
        ];
        saveFaculty();
    } else {
        faculty = JSON.parse(stored) || [];
    }
}

function saveFaculty() {
    localStorage.setItem("faculty", JSON.stringify(faculty));
}

export function addFaculty(facultyName, email, gender, courseCode) {
    faculty.push({
        facultyName,
        email,
        gender,
        courseCode
    });

    saveFaculty();
}

export function deleteFaculty(email) {
    let newFaculty = [];

    faculty.forEach((facultyMember) => {
        if (facultyMember.email !== email) {
            newFaculty.push(facultyMember);
        }
    });

    faculty = newFaculty;

    saveFaculty();
}
