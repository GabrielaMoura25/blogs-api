const createUser = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
      timestamps: false,
      underscored: true,
  });
  user.associate = (models) => {
    user.hasMany(models.BlogPost, { as: 'BlogPost', foreignKey: 'user_id' });
  };
  return user;
};

module.exports = createUser;