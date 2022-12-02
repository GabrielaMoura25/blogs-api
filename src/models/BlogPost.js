const createBlogPosts = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    timestamps: false,
    underscored: true, 
  });
  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User, { as: 'User', foreignKey: 'user_id' });
    blogPost.hasMany(models.PostCategory, { as: 'categories', foreignKey: 'post_id' });
  };
  return blogPost;
};

module.exports = createBlogPosts;