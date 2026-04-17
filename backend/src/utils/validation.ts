export const validateOrgCode = (orgCode: string) => {
  // 3 letters + 3 digits (e.g., ABC123)
  const regex = /^[A-Z]{3}\d{3}$/;
  return regex.test(orgCode);
};