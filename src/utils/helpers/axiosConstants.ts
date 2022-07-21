const xsrfToken = "6027f542-fb12-4ec8-9198-0f63677b8aaa";

const axiosConstants = {
  USER_URL:
    process.env.NODE_ENV === "production"
      ? "https://isw-demo-wallet/api/v1/user"
      : "http://localhost:3001/user",
  PERMISSIONS_URL:
    process.env.NODE_ENV === "production"
      ? "https://isw-demo-wallet/api/v1/user"
      : "http://localhost:3001/permissions",
  XSRF: xsrfToken,
  SESSION: "64af6499-c931-41a3-ad60-ae1e3a1db6b2"
};
export default axiosConstants;
