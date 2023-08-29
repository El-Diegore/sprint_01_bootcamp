const express = require("express");
const router = express.Router();
router.use(express.json())
//const userController = require('../controllers/user.controller')
const {signup, signin, readToken} = require('../middleware/auth')
const {auth_require} = require('../middleware/auth_require')

const {findAll, findUserById, updateUserById,deleteUserById} = require('../controllers/user.controller')
//registro
router.post("/signup", signup) 
//logeo
router.post("/signin", signin);

//Leer token
router.post('/readToken', auth_require, readToken)

//todos los usuarios
router.get("/users", auth_require, findAll);
// usuario por id
router.get("/user/:id", auth_require, findUserById);
// editar usuario
router.put("/user/:id", auth_require, updateUserById);
  //eliminar usuario
router.delete("/user/:id", auth_require, deleteUserById);

module.exports = router;
