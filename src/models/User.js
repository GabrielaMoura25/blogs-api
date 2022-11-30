const createUser = (sequelize, DataTypes) => {
    const user = sequelize.define('User', {
        id: DataTypes.INTEGER,
        display_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        image: DataTypes.STRING,
    });
    user.associate = (models) => {
        user.hasMany(models.blog_posts, { as: 'blog_posts', foreignKey: 'user_id' })
    };
    return user;
};

module.exports = createUser;