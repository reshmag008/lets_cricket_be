const Sequelize = require('sequelize');
const dotenv = require('dotenv')
dotenv.config()
class ConfigConnection {

  connectDB () {
    this.sequelize = new Sequelize('player_auction', 'admin', 'auctionadmin', {
      host: 'player-auction.cxue6q6m2f3h.us-east-1.rds.amazonaws.com',
      port : 3306,
      dialect: 'mysql',
      operatorsAliases: true,
      freezeTableName: true,
    //   logging: true,
    //   pool: {
    //     max: 1,
    //     min: 0,
    //     acquire: 30000,
    //     idle: 10000,
    //     handleDisconnects: true
    //   }
    })
    this.sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.  ')
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err)
      })
    return this.sequelize
  }
}

module.exports = ConfigConnection;



