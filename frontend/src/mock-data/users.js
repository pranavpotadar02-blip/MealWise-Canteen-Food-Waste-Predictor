// ─── Mock Data: Users (demo auth only) ────────────────────────────────────────
// WARNING: This is not real authentication. Demo only — no passwords are secured.
export const demoUsers = {
  admin: {
    id: 'admin-001',
    name: 'Priya Sharma',
    email: 'admin@mealwise.com',
    aliases: ['admin@mealwise.demo', 'admin@mealwise.com'],
    password: 'admin123',
    role: 'admin',
    avatar: 'PS',
    canteen: 'Main Canteen — Block A',
  },
  student: {
    id: 'stu-1042',
    name: 'Arjun Mehta',
    email: 'student@college.edu',
    aliases: ['arjun.mehta@college.edu', 'student@college.edu'],
    password: 'student123',
    role: 'student',
    avatar: 'AM',
    rollNumber: 'CS2024042',
    department: 'Computer Science',
    year: '3rd Year',
  },
};
