const {
  users, 
} = require('../models')
const db = require('../models')
const User = db.users
const Bootcamp = db.bootcamps

// Crear y Guardar Usuarios
exports.createUser = (user) => {
  return User.create({
      firstname: user.firstName,
      lastname: user.lastName,
      email: user.email,
      password: user.password
    })
    .then(user => {
      console.log(`>> Se ha creado el usuario: ${JSON.stringify(user, null, 4)}`)
      return user
    })
    .catch(err => {
      console.log(`>> Error al crear el usuario ${err}`)
    })
}

// obtener los bootcamp de un usuario
exports.findUserById = async (req, res) => {
  const {id} = req.params
  return await User.findByPk(id, {
      include: [{
        model: Bootcamp,
        as: "bootcamps",
        attributes: ["id", "title"],
        through: {
          attributes: [],
        }
      }, ],
    })
    .then(users => {
      return res.status(201).json(users)
    })
    .catch(err => {
      
      console.log(`>> Error mientras se encontraba los usuarios: ${err}`)
      return res.status(400).json(`>> Error mientras se encontraba los usuarios: ${err}`)
    })
}

// obtener todos los Usuarios incluyendo los bootcamp
exports.findAll = async  (req, res) => {
  console.log('aqui')
  return await User.findAll({
    include: [{
      model: Bootcamp,
      as: "bootcamps",
      attributes: ["id", "title"],
      through: {
        attributes: [],
      }
    }, ],
  }).then( users => {
    console.log("aqui en el then", JSON.stringify(users))
    return res.status(201).json(users)
  }).catch(err =>{
    console.log(err, "Error al consultar todos los usuarios")
  })
}

// Actualizar usuarios
exports.updateUserById = (req, res) => {
  const {id} = req.params 
  const {firstName, lastName} = req.body
  return User.update({
      firstName: firstName,
      lastName: lastName
    }, {
      where: {
        id: id
      }
    })
    .then(user => {
      console.log(`>> Se ha actualizado el usuario: ${JSON.stringify(user, null, 4)}`)
      return res.status(200).json(`Se ha actualizado el usuario, 
      Datos actualizados: ${firstName} ${lastName}`)
    })
    .catch(err => {
      console.log(`>> Error mientras se actualizaba el usuario: ${err}`)
    })
}

// Actualizar usuarios
exports.deleteUserById = (req, res) => {
   const {id}= req.params
  return User.destroy({
      where: {
        id: id
      }
    })
    .then(user => {
      console.log(`>> Se ha eliminado el usuario: ${JSON.stringify(user, null, 4)}`)
      return res.status(200).json(`Se ha eliminado exitosamente el usuario con id: ${id}`)
    })
    .catch(err => {
      console.log(`>> Error mientras se eliminaba el usuario: ${err}`)
    })
}