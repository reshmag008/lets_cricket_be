'use strict'
const config = require ('../config/db_connection');
const Sequelize = require('sequelize');

const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)
const db = {}

const configInstance = new config()
const sequelize = configInstance.connectDB();

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    // const model = sequelize.import(path.join(__dirname, file))
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)

    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize

module.exports = db
