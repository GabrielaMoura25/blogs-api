const { Op } = require('sequelize');
const { User, Category, BlogPost, PostCategory } = require('../models');

const postsService = {
  create: async (body, email) => {
    const user = await User.findOne({ where: { email } });
    if (!user) return { error: { code: 404, message: { message: 'User not found' } } };

    const { title, content, categoryIds } = body;
    const categories = await Category.findAll();
    const validateCategories = categories
      .filter(({ dataValues }) => categoryIds.find((id) => id === dataValues.id));
    if (validateCategories.length !== categoryIds.length) {
      return { error: { code: 400, message: { message: 'one or more "categoryIds" not found' } } };
    }
    const post = await BlogPost.create({ title, content, userId: user.id });
    const values = categoryIds.reduce((acc, cur) => (
      [...acc, { postId: post.id, categoryId: cur }]
    ), []);
    await PostCategory.bulkCreate(values);
    return post;
  },

  findAll: async () => {
    const posts = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' },
      ],
    });
    return posts;
  },

  findByPk: async (id) => {
    const post = await BlogPost.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' },
      ],
    });
    if (!post) return { error: { code: 404, message: { message: 'Post does not exist' } } };
    return post;
  },

  update: async (body, id, email) => {
    const user = await User.findOne({ where: { email } });
    const post = await postsService.findByPk(id);
    const t1 = user.toJSON().id;
    const t2 = post.toJSON().userId;

    if (t1 !== t2) {
      return { error: { code: 401, message: { message: 'Unauthorized user' } } };
    }

    await BlogPost.update(body, { where: { id } });
    const updatePost = await postsService.findByPk(id);
    return updatePost;
  },

  destroy: async (id, email) => {
    const user = await User.findOne({ where: { email } });
    const post = await postsService.findByPk(id);

    if (post.error) return { error: { code: 404, message: { message: 'Post does not exist' } } };
    const t1 = user.toJSON().id;
    const t2 = post.toJSON().userId;

    if (t1 !== t2) {
      return { error: { code: 401, message: { message: 'Unauthorized user' } } };
    }
    const deletePost = await BlogPost.destroy({ where: { id } });
    return deletePost;
  },

  findAllSearch: async (search) => {
    const posts = await BlogPost.findAll({
      where: { [Op.or]: [
        { title: { [Op.substring]: search } },
        { content: { [Op.substring]: search } },
      ] },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' },
      ],
    });
    return posts;
  },
};

module.exports = postsService;