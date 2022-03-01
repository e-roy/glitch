export const ironOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: "siwe",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
