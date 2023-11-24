import db from "../models";
import CRUDService from "../services/CRUDService";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();

    return res.render("homePage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (error) {}
};
let getAboutPage = (req, res) => {
  return res.render("about.ejs");
};

let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};
let postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  console.log(message);
  return res.send("post-crud");
};
let displayCRUD = async (req, res) => {
  let data = await CRUDService.getAllUser();
  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};
let editCRUD = async (req, res) => {
  let userId = req.query.id;
  // console.log(userId);

  if (userId) {
    let userData = await CRUDService.getUserById(userId);
    // console.log("---------------------------");
    // console.log(userData);
    // console.log("---------------------------");
    return res.render("editCRUD.ejs", {
      userData: userData,
    });
  } else {
    return res.send("User not found!");
  }
};
let putCRUD = async (req, res) => {
  let data = req.body;
  let allUsers = await CRUDService.UpdateUserData(data);
  return res.render("displayCRUD.ejs", {
    dataTable: allUsers,
  });
};
module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayCRUD: displayCRUD,
  editCRUD: editCRUD,
  putCRUD: putCRUD,
};
