const createPostCategory = (sequelize, DataTypes) => {
  const postCategory = sequelize.define('PostCategory', {
    post_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
  }, {
    timestamps: false,
  });
  postCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'Categories',
      through: postCategory,
      foreignKey: 'post_id',
      otherKey: 'category_id',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'BlogPost',
      through: postCategory,
      foreignKey: 'category_id',
      otherKey: 'post_id',
    });
  };
  return postCategory;
};

module.exports = createPostCategory;