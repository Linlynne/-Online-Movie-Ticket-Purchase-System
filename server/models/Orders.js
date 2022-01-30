module.exports = (sequelize, DataTypes) => {
    
    const Orders = sequelize.define("Orders",{
       
            orderNumber: {
                type: DataTypes.STRING(30),
                allowNull: false
            },

        orderDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(1),
            allowNull: false,
            defaultValue: "Y"
        }
    });
    
    return Orders;
};