module.exports = (sequelize, DataTypes) => {
    
    const Movies = sequelize.define("Movies",{
        movieName: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genre: {
            type: DataTypes.ENUM,
            values: ['action', 'adventure', 'animation', 'family', 'horror','drama','comedy','kids'],
            allowNull: false
        },
        img: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Movies.associate = (models) => {
        
        Movies.hasMany(models.Schedules, {
            onDelete: "cascade",
        });

    //     Users.hasMany(models.Likes, {
    //         onDelete: "cascade",
    //     });
    };


    return Movies;
};