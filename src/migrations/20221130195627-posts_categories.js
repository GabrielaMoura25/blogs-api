'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts_categories', {
      post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'blog_posts',
          key: 'id',
        },
        primaryKey: true,
        onDelete: 'cascade',
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id',
        },
        primaryKey: true,
        onDelete: 'cascade',
      },
    }, {
      timestamps: false,
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('posts_categories');
  },
};
