import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    // creating salt = random data that is added to hashing funcuto to generate unique hash
    const salt = randomBytes(8).toString("hex");

    // create unique hash as buffer   also hashed password along with salt is send to database
    // also with the help of the stored salt it makes esasier to decrypt for comparing the password towards login

    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    // console.log(buf.toString("hex"), salt);
    return `${buf.toString("hex")}.${salt}`;
  }

  /**
   *
   * @param storedPassword
   * @param suppliedPassword
   * @returns boolean
   */

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split(".");
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString("hex") === hashedPassword;
  }
}
