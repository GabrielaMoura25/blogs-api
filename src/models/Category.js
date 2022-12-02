const createCategory = (sequelize, DataTypes) => {
  const category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'categories',
  });
  category.associate = (models) => {
    category.hasMany(models.PostCategory, { as: 'posts', foreignKey: 'category_id' });
  }
  return category;
};

module.exports = createCategory;