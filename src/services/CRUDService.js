import bcrypt from "bcryptjs";
import db from "../models";
var salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassWordFromDB = await hashUserPassWord(data.password);
      await db.User.create({
        email: data.email,
        passworld: hashPassWordFromDB,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
      });
      resolve("Create a new user success!");
    } catch (error) {
      reject(error);
    }
  });
};
let hashUserPassWord = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hashPassWord = await bcrypt.hashSync(password, salt);
      resolve(hashPassWord);
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUser = () => {
  return new Promise((resolve, reject) => {
    try {
      let users = db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
};
