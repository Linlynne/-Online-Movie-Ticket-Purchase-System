module.exports = (sequelize, DataTypes) => {

    const Rooms = sequelize.define("Rooms", {
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rownum: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        colnum: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Rooms.associate = (models) => {

        Rooms.hasMany(models.Schedules, {
            onDelete: "cascade",
        });
    };

    return Rooms;
};