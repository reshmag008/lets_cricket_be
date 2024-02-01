module.exports = (sequelize, type) => {
    return sequelize.define(
      'teams',
      {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        team_name: { type: type.STRING, allowNull: false },
        owner_name: { type: type.STRING, allowNull: false },
        contact_no: { type: type.INTEGER, allowNull: false },
        team_logo: { type: type.STRING, allowNull: false },
        max_bid_amount : { type: type.INTEGER, allowNull: true },
        total_points : { type: type.INTEGER, allowNull: true }
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
  