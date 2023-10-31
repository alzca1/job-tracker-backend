const bcrypt = require("bcrypt");
const saltRounds = 10; // Número de rondas de hashing (mayor es más seguro, pero más lento)

// Para registrar un usuario

const encryptPassword = (plaintextPassword) => {
  console.log("Hashing new user password with @encryptPassword helper");
  try {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(plaintextPassword, salt);
    console.log("User password hashed successfully");
    return hash;
  } catch (error) {
    console.log(
      "There has been a problem while hashing a password at @encryptPassword helper => " + error
    );
    console.log(error);
  }
};
const decryptPassword = (loginPassword, hashedPassword) => {
  try {
    console.log("Unhashing user password with @decryptPassword helper");
    const checkedPassword = bcrypt.compareSync(loginPassword, hashedPassword);
    console.log("User password unhashed successfully but that doesn't mean it's correct...");
    return checkedPassword;
  } catch (error) {
    console.log(error);
    console.log(
      "There has been a problem while unhashing a password at @decryptPassword helper => " + error
    );
    return false;
  }
};

module.exports = { encryptPassword, decryptPassword };
