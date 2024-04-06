module.exports = (sequelize, type) => {
    return sequelize.define(
      'players',
      {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        fullname: { type: type.STRING, allowNull: false },
        location: { type: type.STRING, allowNull: false },
        jersey_no: { type: type.INTEGER, allowNull: true },
        jersey_size: { type: type.INTEGER, allowNull: true },
        jersey_name: { type: type.STRING, allowNull: true },
        contact_no: { type: type.INTEGER, allowNull: false },
        whatsapp_no: { type: type.INTEGER, allowNull: false },
        profile_link : { type: type.STRING, allowNull: true },
        profile_image: { type: type.STRING, allowNull: false },
        player_role: { type: type.STRING, allowNull: false },
        batting_style: { type: type.STRING, allowNull: true },
        bowling_style: { type: type.STRING, allowNull: true },
        team_id : { type: type.INTEGER, allowNull: true },
        base_amount : { type: type.INTEGER, allowNull: true },
        bid_amount : { type: type.INTEGER, allowNull: true },
        un_sold : { type: type.BOOLEAN, allowNull: false, default:false }
      },
      {
        timestamps: true,
        freezeTableName: true, // Model tableName will be the same as the model name
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: 'deletedAt',
        paranoid : true
        // validate
      }
    )
  }
  