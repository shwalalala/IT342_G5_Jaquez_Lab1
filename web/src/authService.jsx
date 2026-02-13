// Mock frontend auth without backend

export const registerUser = async (email, password) => {
  localStorage.setItem("mockUser", JSON.stringify({ email, password }));
  return Promise.resolve({ data: "ok" });
};

export const loginUser = async (email, password) => {
  const user = JSON.parse(localStorage.getItem("mockUser"));
  if (user && user.email === email && user.password === password) {
    localStorage.setItem("token", "mock-jwt-token");
    return Promise.resolve({ data: { token: "mock-jwt-token" } });
  } else {
    return Promise.reject("Invalid credentials");
  }
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    return Promise.resolve({ data: { email: "test@example.com" } });
  } else {
    return Promise.reject("No token");
  }
};
