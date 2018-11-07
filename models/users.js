module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            isUnique: true
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // len: [1, 10],
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 255],
            }
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [7, 255],
                isEmail: true,
            }
        },

        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 255],
            }
        },

        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 255],
            }
        },

        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    return users;
};