const USER_KEY = "ems_users";

// -------------------------
// Load users from localStorage
// -------------------------
function loadUsers() {
  try {
    const users = JSON.parse(localStorage.getItem(USER_KEY));
    return users || [];
  } catch (err) {
    return [];
  }
}

// -------------------------
// Save users to localStorage
// -------------------------
function saveUsers(users) {
  localStorage.setItem(USER_KEY, JSON.stringify(users));
}

export default {
  // -------------------------
  // LOGIN
  // -------------------------
  async login({ email, password }) {
    const users = loadUsers();

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) throw new Error("Invalid credentials");

    const token = "token-" + Date.now();

    return { user, token };
  },

  // -------------------------
  // SIGNUP (ADMIN + EMPLOYEE)
  // -------------------------
  async register({ name, email, password, role, profile }) {
    const users = loadUsers();

    if (users.some((u) => u.email === email)) {
      throw new Error("Email already exists");
    }

    const newUser = {
      id: "u" + Date.now(),
      name,
      email,
      password,
      role, // "admin" or "employee"
      employeeId: role === "employee" ? "e" + Date.now() : null,
      profile: profile || {},
    };

    // Save user to users list
    users.push(newUser);
    saveUsers(users);

    // ALSO create employee record if employee signs up
    if (role === "employee") {
      const empList = JSON.parse(localStorage.getItem("ems_employees") || "[]");

      empList.push({
        id: newUser.employeeId,
        name,
        email,
        department: profile?.department || "",
        joinedDate: new Date().toISOString().slice(0, 10),
      });

      localStorage.setItem("ems_employees", JSON.stringify(empList));
    }

    return { user: newUser, token: "token-" + Date.now() };
  },
};
