const dbConfig = require('../config/db.config')
const dotenv = require('dotenv')
dotenv.config()
const Sequelize = require('sequelize')

console.log("aqui pass", process.env.DB_PASS)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: 'localhost',
  dialect: 'postgres',
  operatorAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./user.model')(sequelize, Sequelize)
db.bootcamps = require('./bootcamp.model')(sequelize, Sequelize)


db.users.belongsToMany(db.bootcamps, {
  through: "user_bootcamp",
  as: "bootcamps",
  foreignKey: "user_id",
});
db.bootcamps.belongsToMany(db.users, {
  through: "user_bootcamp",
  as: "users",
  foreignKey: "bootcamp_id",
});

async function syncDB () {
  try {
      await sequelize.authenticate()
      console.log('Conexión lograda')
  }catch(error) {
      console.error('No nos pudimos conectar', error)
  }
}

syncDB()
module.exports = db