const TOKEN_LIFETIME = 60 * 60 * 24; // 1 day

export default {
  mysql: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    db: process.env.DB,
  },
  jwt: {
    SECRET: process.env.JWT_SECRET,
    EXPIRES: TOKEN_LIFETIME,
  },

  crypto: {
    ALGORITHM: process.env.TOKEN_ALGORITHM,
  },
};
