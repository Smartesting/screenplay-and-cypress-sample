type CONFIG_ENTRIES = {
  jwtEncryption: string;
};

export const CONFIG: CONFIG_ENTRIES = {
  jwtEncryption:
    process.env.JWT_ENCRYPTION || "Jj4Jt6yLF0eQT8HvqiWuHuUmyMQB6S4I",
};
