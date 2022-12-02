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
};

module.exports = postsService;