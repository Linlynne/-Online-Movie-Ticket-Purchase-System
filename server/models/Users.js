module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
            allowNull: false
        }
    });

     Users.associate = (models) => {
         
         Users.hasMany(models.Orders, {
             onDelete: "cascade",
         });

     };

    return Users;
};