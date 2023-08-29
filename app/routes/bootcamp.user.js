const express = require("express");
const router = express.Router();
const {findAll, findById, createBootcamp,addUser} = require('../controllers/bootcamp.controller')
const {auth_require}= require('../middleware/auth_require')

//obtener todos los bootcamps
router.get("/bootcamp", findAll);
//crear bootcamp
router.post("/bootcamp", auth_require, createBootcamp);
//agregar usuario a un bootcamp
router.post("/bootcamp/adduser", auth_require, addUser);
//Obtener bootcamp por id
router.get("/bootcamp/:id", auth_require, findById);


module.exports = router;