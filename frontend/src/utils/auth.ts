export const setAuth = (token: string) => {
  localStorage.setItem("token", token);

  // decode JWT payload
  const payload = JSON.parse(atob(token.split(".")[1]));

  localStorage.setItem("role", payload.role);
  localStorage.setItem("organizationId", payload.organizationId || "");
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getRole = () => {
  return localStorage.getItem("role");
};

export const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};