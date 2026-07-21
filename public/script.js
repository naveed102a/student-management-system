const API_URL = 'http://localhost:3000/api/students';

const form = document.getElementById('studentForm');
const tableBody = document.getElementById('studentTableBody');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const studentIdField = document.getElementById('studentId');

// Page load hote hi students fetch karo
document.addEventListener('DOMContentLoaded', loadStudents);

// ---------- LOAD / DISPLAY STUDENTS ----------
async function loadStudents() {
    try {
        const res = await fetch(API_URL);
        const students = await res.json();

        tableBody.innerHTML = '';
        students.forEach(s => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${s.id}</td>
                <td>${s.name}</td>
                <td>${s.roll_no}</td>
                <td>${s.department}</td>
                <td>${s.semester}</td>
                <td>${s.email ?? ''}</td>
                <td>
                    <button class="edit-btn" onclick="editStudent(${s.id}, '${s.name}', '${s.roll_no}', '${s.department}', ${s.semester}, '${s.email ?? ''}')">Edit</button>
                    <button class="delete-btn" onclick="deleteStudent(${s.id})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (err) {
        console.error('Students load nahi hue:', err);
        alert('Server se connect nahi ho paya. Kya server chal raha hai? (npm start)');
    }
}

// ---------- ADD / UPDATE STUDENT ----------
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const student = {
        name: document.getElementById('name').value,
        roll_no: document.getElementById('roll_no').value,
        department: document.getElementById('department').value,
        semester: document.getElementById('semester').value,
        email: document.getElementById('email').value,
    };

    const id = studentIdField.value;

    try {
        if (id) {
            // Update existing student
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(student)
            });
        } else {
            // Add new student
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(student)
            });
        }

        resetForm();
        loadStudents();
    } catch (err) {
        console.error('Save nahi hua:', err);
        alert('Kuch masla ho gaya. Console check karein.');
    }
});

// ---------- EDIT STUDENT (form fill karna) ----------
function editStudent(id, name, roll_no, department, semester, email) {
    studentIdField.value = id;
    document.getElementById('name').value = name;
    document.getElementById('roll_no').value = roll_no;
    document.getElementById('department').value = department;
    document.getElementById('semester').value = semester;
    document.getElementById('email').value = email;

    formTitle.textContent = 'Edit Student';
    submitBtn.textContent = 'Update Student';
    cancelBtn.style.display = 'inline-block';
}

// ---------- DELETE STUDENT ----------
async function deleteStudent(id) {
    if (!confirm('Kya aap is student ko delete karna chahte hain?')) return;

    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        loadStudents();
    } catch (err) {
        console.error('Delete nahi hua:', err);
    }
}

// ---------- CANCEL EDIT ----------
cancelBtn.addEventListener('click', resetForm);

function resetForm() {
    form.reset();
    studentIdField.value = '';
    formTitle.textContent = 'Add New Student';
    submitBtn.textContent = 'Add Student';
    cancelBtn.style.display = 'none';
}
