module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define(
        "Products",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING
            },
            qty: {
                type: DataTypes.INTEGER
            },
            price: {
                type: DataTypes.INTEGER
            },
            active: {
                type: DataTypes.BOOLEAN
            },
            image: {
                type: DataTypes.STRING
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true
            }
        }, {
        tableName: "products"
    }
    );

    // const Carts = sequelize.define(
    //     "Carts",
    //     {
    //         id:  {
    //             type: DataTypes.INTEGER,
    //             primaryKey: true,
    //             autoIncrement: true,
    //             allowNull: false
    //           },
    //           productId:{
    //             type: DataTypes.INTEGER,
    //             allowNull: false,
    //             references:{ model:'products', key:'id'}
    //           },
    //           qty:{
    //             type: DataTypes.INTEGER,
    //             allowNull: false
    //           },
    //           createdAt:{
    //             type: DataTypes.DATE,
    //             allowNull: false
    //           },
    //           updatedAt:{
    //             type: DataTypes.DATE,
    //             allowNull: true
    //           },
    //           createdBy:{
    //             type: DataTypes.STRING
    //           },
    //           updatedBy:{
    //             type: DataTypes.STRING
    //           }
    //     }, 
    //     {
    //         tableName: "carts"
    //     }
    // );

    // Products.hasOne(Carts);

    return Products;
}
