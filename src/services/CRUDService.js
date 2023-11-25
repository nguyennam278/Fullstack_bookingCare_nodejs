import bcrypt from "bcryptjs";
import db from "../models";
var salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassWordFromDB = await hashUserPassWord(data.password);
      await db.User.create({
        email: data.email,
        password: hashPassWordFromDB,
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
let getUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });
      if (user) resolve(user);
      else resolve({});
    } catch (error) {
      reject(error);
    }
  });
};
let UpdateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phoneNumber = data.phoneNumber;

        await user.save();

        let allUsers = db.User.findAll();
        resolve(allUsers);
      } else {
        resolve();
      }
      await db.User.update({});
    } catch (error) {
      reject(error);
    }
  });
};
let deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });
      if (user) {
        await user.destroy();
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserById: getUserById,
  UpdateUserData: UpdateUserData,
  deleteUserById: deleteUserById,
};
