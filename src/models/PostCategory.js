const createPostCategory = (sequelize, DataTypes) => {
  const postCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'blog_posts',
        key: 'id',
      },
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id',
      },
      primaryKey: true,
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'posts_categories',
  });
  postCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'Categories',
      through: 'posts_categories',
      foreignKey: 'post_id',
      otherKey: 'category_id',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'BlogPost',
      through: 'posts_categories',
      foreignKey: 'category_id',
      otherKey: 'post_id',
    });
  };
  return postCategory;
};

module.exports = createPostCategory;