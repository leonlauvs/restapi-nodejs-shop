module.exports = (sequelize, DataTypes) => {
    const Checkouts = sequelize.define(
        "Checkouts",
        {
            id:  {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
              },
              code:{
                type: DataTypes.STRING,
              },
              firstName:{
                type: DataTypes.STRING,
                allowNull: false
              },
              lastName:{
                type: DataTypes.STRING,
                allowNull: false
              },
              address1:{
                type: DataTypes.STRING,
                allowNull: false
              },
              address2:{
                type: DataTypes.STRING
              },
              city:{
                type: DataTypes.STRING,
                allowNull: false
              },
              state:{
                type: DataTypes.STRING
              },
              zip:{
                type: DataTypes.STRING,
                allowNull: false
              },
              country:{
                type: DataTypes.STRING,
                allowNull: false
              },
              total:{
                type: DataTypes.INTEGER
              },
              createdAt:{
                type: DataTypes.DATE,
                allowNull: false
              },
              updatedAt:{
                type: DataTypes.DATE,
                allowNull: true
              },
              createdBy:{
                type: DataTypes.STRING
              },
              updatedBy:{
                type: DataTypes.STRING
              }
        }, {
        tableName: "checkouts"
    }
    );

    // Checkouts.hasMany(Comment, { as: "comments" });

    Checkouts.associate = models => {
      Checkouts.hasMany(models.Purchases, {
        as: "purchases",
      });
    };
    
    return Checkouts;
}
