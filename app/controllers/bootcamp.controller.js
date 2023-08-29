const {
  users,
  bootcamps
} = require('../models')
const db = require('../models')
const Bootcamp = db.bootcamps
const User = db.users

// Crear y guardar un nuevo bootcamp
exports.createBootcamp = (req, res) => {
  const {title, cue, description} = req.body
  return Bootcamp.create({
      title: title,
      cue: cue,
      description: description,
    })
    .then(bootcamp => {
      console.log(`>> Creado el bootcamp: ${JSON.stringify(bootcamp, null, 4)}`)
      return res.status(200).json(bootcamp)
    })
    .catch(err => {
      console.log(`>> Error al crear el bootcamp: ${err}`)
    })
}

// Agregar un Usuario al Bootcamp
exports.addUser = (req, res) => {
  const {bootcampId, userId}= req.body
  return Bootcamp.findByPk(bootcampId)
    .then((bootcamp) => {
      if (!bootcamp) {
        console.log("No se encontro el Bootcamp!");
        return null;
      }
      return User.findByPk(userId).then((user) => {
        if (!user) {
          console.log("Usuario no encontrado!");
          return null;
        }
        bootcamp.addUser(user);
        console.log('***************************')
        console.log(` Agregado el usuario id=${user.id} al bootcamp con id=${bootcamp.id}`);
        console.log('***************************')
        return res.status(201).json(`Se ha agregado correctamente el usuario ${userId} al bootcamp ${bootcampId}`);
      });
    })
    .catch((err) => {
      console.log(">> Error mientras se estaba agregando Usuario al Bootcamp", err);
    });
};


// obtener los bootcamp por id 
exports.findById = (req, res) => {
  const {id} = req.params
  return Bootcamp.findByPk(id, {
      include: [{
        model: User,
        as: "users",
        attributes: ["id", "firstName", "lastName"],
        through: {
          attributes: [],
        }
      }, ],
    })
    .then(bootcamp => {
      if(bootcamp){
        return res.status(200).json(bootcamp)

      }else{
        console.error("Error al solicitar el bootcamp");
        res.status(400).json("Error al solicitar el bootcamp")
      }
    })
    .catch(err => {

      console.log(`>> Error mientras se encontraba el bootcamp: ${err}`)
      res.status(404).json(`Error al solicitar el bootcamp`)
    })
}

// obtener todos los Usuarios incluyendo los Bootcamp
exports.findAll = (req, res) => {
  return Bootcamp.findAll({
    include: [{
      model: User,
      as: "users",
      attributes: ["id", "firstName", "lastName"],
      through: {
        attributes: [],
      }
    }, ],
  }).then(bootcamps => {
    return res.status(200).json(bootcamps)
  }).catch((err) => {
    console.log(">> Error Buscando los Bootcamps: ", err);
  });
}