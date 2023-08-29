//que contiene una función de verificar token llamada verifyToken
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const key = require('../config/auth.config')
const db = require('../models')
const {users} = require('../models/user.model')
const User = db.users;


//Logear 
const signin = async (req, res) => {
  const { email, password } = req.body;

  const verifyUserByEmail = await User.findOne({ where: { email } });

  if (!verifyUserByEmail) {
    return res.status(404).json({ error: "Oe, el mail no lo pille" });
  }

  const verifyPassword = await bcrypt.compare(
    password,
    verifyUserByEmail.password
  );

  if (!verifyPassword) {
    return res.status(404).json({ error: "Pass incorrecta" });
  }

  const expireTime = Math.floor(new Date() / 1000) + 3600;

  const token = jwt.sign(
    {
      exp: expireTime,
      data: {
        id: verifyUserByEmail.id,
        email: verifyUserByEmail.email,
        firstName: verifyUserByEmail.firstName,
        lastName: verifyUserByEmail.lastName,
      },
    },
    key.secret_key
  );
  console.log("aqui token", token)
  res.json(token);
};
//registrar
const signup = async (req, res) => {

  const { firstName, lastName, email, password } = req.body;
//console.log(req.body)
  if (!firstName || !lastName || !email || !password) {
    return res
      .status(400)
      .json({ error: "rellena toos los campoh, ponte vioh" });
  }

  const verifyUser = await User.findOne({ where: { email } });
  console.log(verifyUser, "Aqui")
  if (verifyUser) {
    return res.status(404).json({ error: "Oe, este usuario ya existe" });
  }

  let newUser
  try {
    const passwordEncrypt = await bcrypt.hash(password, 10);
    newUser = await User.create({
      firstName,
      lastName,
      email,
      password: passwordEncrypt,
    });
    //console.log(newUser, "llegue")
    return res.status(201).json(newUser)

  } catch (error) {
    return res.status(400).json({error: "no se ha podido registrar"})
  }
};
//leer token
const readToken = async (req, res) => {
  console.log("aqui req", req)
  const {authorization} = req.headers
  console.log(authorization, "aqui authorization")

  try {
      const decoded = jwt.verify(authorization, key.secret_key)
      console.log(authorization, "aqui token")
      console.log(key.secret_key, "aqui secret key")
      res.json(decoded)
  } catch (error) {
    console.log("eror en el aurh js")
      return res.status(400).json(error)
  }
}


  module.exports = {signin, signup, readToken}