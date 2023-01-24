module.exports = (sequelize, DataTypes) => {
    const Purchases = sequelize.define(
        "Purchases",
        {
            id:  {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
              },
              checkoutId:{
                type: DataTypes.INTEGER,
                allowNull: false,
                references:{ model:'checkouts', key:'id'}
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
              price:{
                type: DataTypes.INTEGER,
                allowNull: false
              },
              subtotal:{
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
        tableName: "purchases"
    });

    // Purchases.belongsTo(Checkouts, {
    //   foreignKey: "id",
    //   as: "checkoutId",
    // });

    Purchases.associate = models => {
      Purchases.belongsTo(models.Checkouts, {
        foreignKey: "checkoutId",
        as: "checkout",
      });
    };

    return Purchases;
}
