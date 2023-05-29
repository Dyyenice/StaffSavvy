module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
<<<<<<< HEAD
        username: {
            type: Sequelize.STRING
        },
=======

>>>>>>> 4cbc62f10cf60f9ac4109e4c9422a7f504d81547
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
<<<<<<< HEAD
        }
=======
        },
        user_type: {
            type: Sequelize.INTEGER
        },

>>>>>>> 4cbc62f10cf60f9ac4109e4c9422a7f504d81547
    });

    return User;
};