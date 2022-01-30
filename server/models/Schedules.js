module.exports = (sequelize, DataTypes) => {
    
    const Schedules = sequelize.define("Schedules",{
        showTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        occupiedSeats: {
            type: DataTypes.STRING(2000),
            allowNull: true
        },

    });

    Schedules.associate = (models) => {
         
        Schedules.hasMany(models.Orders, {
            onDelete: "cascade",
        });

    };

    return Schedules;
};