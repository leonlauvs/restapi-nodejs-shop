module.exports = (sequelize, DataTypes) => {
    const Carts = sequelize.define(
        "Carts",
        {
            id:  {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
              },
              productId:{
                type: DataTypes.INTEGER,
                allowNull: false,
                references:{ model:'products', key:'id'}
              },
              qty:{
                type: DataTypes.INTEGER,
                allowNull: false
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
        tableName: "carts"
    }
    );

    return Carts;
}
