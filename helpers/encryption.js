const bcrypt = require("bcrypt");
const saltRounds = 10; // Número de rondas de hashing (mayor es más seguro, pero más lento)

// Para registrar un usuario

const encryptPassword = (plaintextPassword) => {
  try {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(plaintextPassword, salt);
    return hash;
  } catch (error) {
    console.log(error);
  }
};
const decryptPassword = (loginPassword, hashedPassword) => {
  try {
    const checkedPassword = bcrypt.compareSync(loginPassword, hashedPassword);
    return checkedPassword;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = { encryptPassword, decryptPassword };
