import bcrypt from "bcryptjs";

export const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    const saltRounds = bcrypt.genSaltSync(10)
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.error("Eroare la hash-ui parola:", err);
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};
