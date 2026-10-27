// ─── Auth Service (Demo) ───────────────────────────────────────────────────────
// WARNING: Frontend-only demo. Not real authentication.
import { demoUsers } from '../mock-data/users';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function loginAdmin({ email, password }) {
  await delay(400);
  const user = demoUsers.admin;
  const inputEmail = (email || '').trim().toLowerCase();
  const validEmails = [user.email.toLowerCase(), ...(user.aliases || []).map((a) => a.toLowerCase())];

  if (validEmails.includes(inputEmail) && password === user.password) {
    return { success: true, user };
  }
  // Also allow fallback if password matches demo password and starts with admin
  if (inputEmail.startsWith('admin') && password === user.password) {
    return { success: true, user: { ...user, email: inputEmail } };
  }
  throw new Error('Invalid email or password. Use demo credentials: admin@mealwise.com / admin123');
}

export async function loginStudent({ email, password }) {
  await delay(400);
  const user = demoUsers.student;
  const inputEmail = (email || '').trim().toLowerCase();
  const validEmails = [user.email.toLowerCase(), ...(user.aliases || []).map((a) => a.toLowerCase())];

  if (validEmails.includes(inputEmail) && password === user.password) {
    return { success: true, user };
  }
  // Also allow any college student email or any password matching student123
  if (password === user.password || inputEmail.includes('student') || inputEmail.endsWith('.edu')) {
    const studentName = inputEmail.split('@')[0].replace(/[._]/g, ' ') || user.name;
    const formattedName = studentName.charAt(0).toUpperCase() + studentName.slice(1);
    return {
      success: true,
      user: {
        ...user,
        email: inputEmail || user.email,
        name: formattedName,
        avatar: formattedName.slice(0, 2).toUpperCase(),
      },
    };
  }
  throw new Error('Invalid credentials. Use demo credentials: student@college.edu / student123');
}

export async function registerStudent(data) {
  await delay(500);
  // Demo: always succeeds for any valid input
  const name = data.name || 'New Student';
  return {
    success: true,
    user: {
      id: `stu-${Date.now()}`,
      name,
      email: data.email,
      rollNumber: data.rollNumber || 'CS2024999',
      department: data.department || 'Engineering',
      role: 'student',
      avatar: name.slice(0, 2).toUpperCase(),
    },
  };
}

export function logout() {
  return Promise.resolve();
}
